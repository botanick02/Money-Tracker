import { useState } from "react";
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown/Dropdown";
import { Transaction } from "../../types/Transaction";
import { useForm } from "react-hook-form";
import { getISODateTimeValue } from "../../tools/Dates/currentIsoDates";

interface FormFields {
  operationId: string;
  title: string;
  amount: number;
  note: string | null;
  createdAt: string;
  categoryId: string;
}

interface TransactionEditProps {
  transaction: Transaction;
  categoryOptions: Option[];
  accountOptions: Option[];
  onSave(data: any): void;
  onCancel(): void;
}

const TransactionEdit = ({
  transaction,
  categoryOptions,
  accountOptions,
  onSave,
  onCancel,
}: TransactionEditProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormFields>({
    defaultValues: {
      title: transaction.title,
      amount: Math.abs(transaction.amount),
      createdAt: getISODateTimeValue(new Date(transaction.createdAt)),
      note: transaction.note,
    },
  });

  const [categoryId, setCategoryId] = useState<Option>(
    categoryOptions.find((o) => o.value === transaction.category.id)!
  );

  const [account, setAccount] = useState<Option>(
    accountOptions.find((option) => option.value === transaction.accountId) ??
      accountOptions[0]
  );

  const handleCategoryChange = (option: Option) => {
    setCategoryId(option);
  };

  const handleAccountChange = (option: Option) => {
    setAccount(option);
  };

  const saveOperation = (data: FormFields) => {
    onSave({
      operationId: transaction.operationId,
      amount: +data.amount,
      title: data.title,
      categoryId: categoryId.value,
      note: data.note,
      createdAt: new Date(data.createdAt).toISOString(),
      fromAccountId: account.value,
      toAccountId: account.value,
    });
  };

  return (
    <>
      <div className={"popup__fields"}>
        <div className={"popup__fields__amount"}>
          {transaction.amount < 0 && "-"}
          <InputWrapper>
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", {
                required: "Amount is required",
              })}
            />
            {errors.amount && <span>{errors.amount.message}</span>}
          </InputWrapper>
          ₴
        </div>
        <InputWrapper>
          <input type="text" placeholder="Title" {...register("title")} />
        </InputWrapper>
        <InputWrapper>
          <input
            type="datetime-local"
            placeholder="Transaction time"
            {...register("createdAt", {
              required: "Transaction time is required",
            })}
          />
        </InputWrapper>
        <Dropdown
          title={"Category"}
          selectHandler={handleCategoryChange}
          options={categoryOptions}
          defaultOptionIndex={
            categoryOptions.findIndex(
              (o) => o.value === transaction.category.id
            ) + 1
          }
        />
        <Dropdown
          title={"Account"}
          selectHandler={handleAccountChange}
          options={accountOptions}
          defaultOptionIndex={
            accountOptions.findIndex((o) => o.value === transaction.accountId) +
            1
          }
        />
        <InputWrapper>
          <input type="text" placeholder="Note" {...register("note")} />
        </InputWrapper>
      </div>
      <div className={"popup__row"}>
        <button onClick={handleSubmit(saveOperation)} className={"button"}>
          Save
        </button>
        <button onClick={() => onCancel()} className={"button"}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default TransactionEdit;
