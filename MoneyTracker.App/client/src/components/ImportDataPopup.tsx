import { useState } from "react";
import { useAppSelector } from "../hooks/useAppDispatch";
import React from "react";
import Dropdown, { Option } from "../elements/Dropdown";
import { useNavigate } from "react-router-dom";
import InputWrapper from "../elements/InputWrapper";

interface ImportDataPopupProps {
  closePopupHandle: () => void;
}

const ImportDataPopup = ({ closePopupHandle }: ImportDataPopupProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const currentAccountId = useAppSelector(
    (state) => state.Account.currentAccountId
  );

  const [savingsAccountRequired, setSavingsAccountRequired] = useState(false);
  const [savingsAccountName, setSavingsAccountName] = useState("");

  const accounts = useAppSelector((state) =>
    state.Account.accounts.filter((account) => account.isActive)
  );

  const accountOptions: Option[] = [];
  accounts
    .filter((a) => a.id !== "total")
    .forEach((account) => {
      accountOptions.push({
        label: account.name,
        value: account.id,
      });
    });

  const [account, setAccount] = useState<Option>(
    accountOptions.find((option) => option.value === currentAccountId) ||
      accountOptions[0]
  );

  const handleUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();

      formData.append(
        "operations",
        JSON.stringify({
          query: `
          mutation ($file: Upload!, $accountId: String!, $savingsAccountName: String, $savingsAccountId: String) {
            dataImportMutation{
              importMonobankXls(file: $file, accountId: $accountId, savingsAccountName: $savingsAccountName, savingsAccountId: $savingsAccountId)
            }
          }
        `,
          variables: {
            file: null,
            accountId: account.value,
            savingsAccountName:
              savingsAccountName != "" ? savingsAccountName : null,
          },
        })
      );

      formData.append("map", `{ "0": ["variables.file"] }`);
      formData.append("0", selectedFile);

      const headers = {
        Accept: "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      };

      try {
        const response = await fetch("https://localhost:7299/graphql", {
          method: "POST",
          headers: headers,
          body: formData,
        });

        const result = await response.json();
        if (result.errors.length > 0) {
          setSavingsAccountRequired(true);
        } else {
          importSuccess();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const navigate = useNavigate();

  const importSuccess = () => {
    closePopupHandle();
    navigate("/");
  };

  return (
    <div
      className={"popup-bg"}
      onClick={(event) => {
        event.stopPropagation();
        closePopupHandle();
      }}
    >
      <div className={"popup"} onClick={(event) => event.stopPropagation()}>
        <div className={`popup__header title-single`}>Import Data</div>
        <div className={"popup__fields"}>
          <input type="file" onChange={handleFileChange} />
          <Dropdown
            title={"Account"}
            selectHandler={setAccount}
            options={accountOptions}
          />
          {savingsAccountRequired && (
            <>
              Usage of the Bonobank savings accounts where identified, please enter the name for the account
              <InputWrapper>
                <input
                  placeholder="Savings account name"
                  type="text"
                  value={savingsAccountName}
                  onChange={(event) =>
                    setSavingsAccountName(event.target.value)
                  }
                />
              </InputWrapper>
            </>
          )}
        </div>
        <div className={"popup__row"}>
          <button className="button" onClick={handleUpload}>
            Import
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImportDataPopup;
