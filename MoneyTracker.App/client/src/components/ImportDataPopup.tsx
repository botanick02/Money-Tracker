import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import { request } from "../api/core";
import React from "react";
import Dropdown, { Option } from "../elements/Dropdown";

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
          mutation ($file: Upload!, $accountId: String!) {
            dataImportMutation{
              importMonobankXls(file: $file, accountId: $accountId)
            }
          }
        `,
          variables: {
            file: null,
            accountId: account.value,
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
        console.log(result);
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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
