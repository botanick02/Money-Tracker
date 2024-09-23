import { useState } from "react";
import InputWrapper from "../../elements/InputWrapper";
import Dropdown, { Option } from "../../elements/Dropdown";
import { Transaction } from "../../types/Transaction";
import { useForm } from "react-hook-form";
import { getISODateTimeValue } from "../../tools/Dates/currentIsoDates";
import { TransactionTypes } from "../../store/FinancialOperation/FinancialOperation.slice";

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

  const [account, setAccount] = useState<Option>(
    accountOptions.find((option) => option.value === transaction.accountId) ??
      accountOptions[0]
  );

  const [fromAccount, setFromAccount] = useState<Option | null>(
    accountOptions.find(
      (option) => option.value === transaction.fromAccountId
    ) ?? null
  );

  const handleAccountChange = (option: Option) => {
    setAccount(option);
  };

  const saveOperation = (data: FormFields) => {
    if (account === fromAccount) {
      return null;
    }
    onSave({
      operationId: transaction.operationId,
      amount: +data.amount,
      title: data.title,
      categoryId: transaction.category.id,
      note: data.note,
      createdAt: new Date(data.createdAt).toISOString(),
      fromAccountId: fromAccount?.value,
      toAccountId: account.value,
    });
  };

  return (
    <>
      <div className={"popup__fields"}>
        <div className={"popup__fields__amount"}>
          {transaction.amount < 0 && "-"}
          <InputWrapper error={errors.amount ? errors.amount.message : ""}>
            <input
              type="number"
              placeholder="Amount"
              {...register("amount", {
                required: "Amount is required",
              })}
            />
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
        {transaction.category.type === TransactionTypes.Transfer ? (
          <div className={"popup__row"}>
            <Dropdown
              title={"From"}
              selectHandler={(option) => setFromAccount(option)}
              defaultOptionIndex={
                accountOptions.findIndex(
                  (o) => o.value === transaction.fromAccountId
                ) + 1
              }
              options={accountOptions}
            />
            <Dropdown
              title={"To"}
              selectHandler={(option) => setAccount(option)}
              defaultOptionIndex={
                accountOptions.findIndex(
                  (o) => o.value === transaction.accountId
                ) + 1
              }
              options={accountOptions}
            />
          </div>
        ) : (
          <Dropdown
            title={"Account"}
            selectHandler={handleAccountChange}
            options={accountOptions}
            defaultOptionIndex={
              accountOptions.findIndex(
                (o) => o.value === transaction.accountId
              ) + 1
            }
          />
        )}

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
