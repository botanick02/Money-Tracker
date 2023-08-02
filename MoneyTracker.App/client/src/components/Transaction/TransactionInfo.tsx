import React, { useState } from "react";
import { Transaction } from "../../types/Transaction";
import DeletePopup from "../DeletePopup";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { CANCEL_FINANCIAL_OPERATION } from "../../store/FinancialOperation/FinancialOperation.slice";
import { ReactComponent as EditIcon } from "../../assets/icons/Edit-icon.svg";
import InputWrapper from "../../elements/InputWrapper";

interface TransactionInfoProps {
  closePopupHandle(): void;
  transaction: Transaction;
}

const TransactionInfo = ({
  closePopupHandle,
  transaction,
}: TransactionInfoProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const type = transaction.amount > 0 ? "income" : "expense";

  const dispatch = useAppDispatch();

  const confirmDeletion = () => {
    dispatch(
      CANCEL_FINANCIAL_OPERATION({ operationId: transaction.operationId })
    );
  };

  return (
    <div className={"popup-bg"}>
      {isDeletePopupOpen && (
        <DeletePopup
          onDeleteApprove={confirmDeletion}
          closePopupHandle={() => setIsDeletePopupOpen(false)}
        />
      )}
      <div className={"popup"}>
        <div className={`popup__header title-single ${type}`}>
          {isEditMode ? "Edit" : transaction.title}
        </div>

        {isEditMode ? (
          <div className={"popup__fields"}>
            
          
          </div>
        ) : (
          <div className={"popup__info"}>
            <div className={`popup__info__amount ${type}`}>
              {transaction.amount} ₴
            </div>

            <div className={"popup__info__item"}>
              Category:
              <div className="popup__info__item__category">
                <img
                  src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBUVFRgWFRYYGBgaGBgYGBgYGRgYGBgYGBgZGRgYGBgcIS4lHB4rIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjQhISE0MTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALcBEwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAEAAECAwUGB//EADwQAAIBAwIEAwYEBQIGAwAAAAECAAMEESExBRJBUQZhcSIygZGh0ROxwfBCUmKS4XKCFBUjM0PxFlOi/8QAGQEBAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAJREAAgICAgICAQUAAAAAAAAAAAECERIhAzFBUQQigRMycZGh/9oADAMBAAIRAxEAPwDcTeWPONu/FuKhCcpQbE517y1fF2ntIPUGRfGm1Zf1InYrtB6kazv0dQQ65IzjIyPKWPtOEouOmqOiafQPTjVpKnI1Zk0DiTWQEmsAI6RJHG0ZIBGrLqG0qdZfSGk0Rg7byT7SDnWTO0AlQ2gNz700KA0gFyPakKWUY7bxW66R3GsAsre7AFh9b3YAsALtpXfS22ld6sACEPttoDyw+32hAqrbyB2k628gdoBVT3kmkU3kmgD041faPSEncrpABaci5jrIvAL0OkZoyGJpQRxGk+U9j8ooIeVCt5xvxzn49IOGPeM0+hkzzUa6cQYdTDaHHHXZz8z+k5sPiS/FM0uQzR1qeJqg/jPz+8Ip+KqnUg/CcYKp/eZJa370jKL7S/otNeTvaHibO6g+k1LDjSVHVACGY4Guemdp5olf96zZ8L3RFzSIOzE+nsnyExyR48W68GouWSVnp+NIyS9b4Po6g+Y0P+ZNbUEAo2cjODof8z5ikmepxaBXaXU20ldzQZdwRBLviC0UBOpOwmnLFWxGLk6RZU3k86TOtuPo5w6L6gYP0mxR4jbDGVLeROR+cyuSLNy4ZIlZ02b3QT++pldzwqqW0T/9J94c3iJAMIAo7DSAtxgZzmHKKMqD8hNtwarj2uVfVs/lmF/8npjV6h/2gAfXMyn40TsYBX4mzdZHyJDH2bd1ZpjCPr2b7iYtSiyHDKR27H0OxldDiIz7U17biSsDzYK9FOoPqIUrLj6BLaRvDNFKdJvdPIfmvy6QHiVFlGSNO41Hzm7MtGeWh1vtM4TQttpQyurIHaTqyDbQQpTeSaRSWBCdgTCA1MyVw2kmls3bHxlxtQfePymsWS0ZaSxKLOdPn0mgLdBsoz56xMxG2kqj7I5EFtVUanP0Erqug6CRrXGND+/WZ13eAdZuqMhv/FqO/wAzGnOm5/qiixZ58DJmVgxZndM4jmNFHgDR8xHEUAcGbPhh/wDrqewJ69sfrMbE1/DyHnZuwx8//UxyuoM3D9yPRqF9DqF9t0nM0KmkLSpPkW0eyzr6d6SMZz5bict42qJyo2Qp1UgDAI3yP31l9K7IMp4pTWquGGZrLWzcZKLs5ClcEGH0r095VW4DjVGI/pOogb2lZN0J811+m86LF9Bzs2kvTJm785z6XJzjXPbBB+U0Layq1dgMebKvw1MjRLs07a5z+ctq1eneB39jVtgvOB7QyMHP17zNp3Tk7SUXB9msznOkKSq3QTPov1hdCo7nlQep6D4w9Elo2Le6xjJm9bPhcucKR7pGSw/0np6zlrq2KJzc/tZAJIGBk6kdsfODWvFHyExnJOW1YsT/ABnMy5VG09mFctJHUtZU3yUPI38p1Xy8xIrRKaMMefT1BmTQuSjZz6zetr3BGcEdiARib4uXLT7MuJzdzxtdSiVairu9Omzrp/UBy/WWcL4xb1x7LkN1Rhyt577/AAndC6BQY2xsNh5YnC+LfDKvmtQHLUHtELpzfZp6VKJmjVRkXYD46/WSNwO84Lh3GGJ5KhPMOp/iH6HuJpm9HRtJ0MHStcdsyl7lv35TDPEBjeUvxLTTOcfvSUlm4/EQM5MBueMgaDWYlSoz7D7CUsn82Pn9pLJkGXHF2fpAajudScDv/wC4yOBuCfT2ZIVx0AH1Pz3k2TbKuT+r84pb+JnvFH5J+TixHijT0EHijCPAFFFFAHnSeHqWELdz+Wk5sTruG0ylNPTPznD5MqjXs3xL7GvQxL8wBKnaEpVzPmtHqC1lmPOUU3lgPUTLBYacblk1aS5QYMsEqWitrjXvGW1ZYXykSxTKDPuLfnUIzMQNQMnTPbttAX4Qy6oeYfynGfgZ0AUS1aQ6zSbNqT9nIOja8/sgbjb5mH2XESNCmgxy494jA15DuOunymrxDhquumOYe6SNj+s5m4s3QnnXTQHXmPk2u+Pym9SVM5Su9mrcuK5yr6DdP5fhuPjJs9OiuTp9Wb9/KZKUmI5ydgeU5yQRqMNvjTbbWTuLpai4ZcOBow0OmuCD0mHxp1RtTdUWHiNXIqFCKWcY75653/TpOjtK+V0ORjIPcTPsan4tLD4JwVcd+xPbMfh9oaQKc/N7RKjQEDt5zD1taaCfs3aF4VGMwk3IMymHs5hFuZ2hLJWRxOT8YcOAcVU0ycMR0bo36GZNnWLjXQjQ57zvOK01emykDUH/ABPMjW5HDYz/AAsO5Gx/L5z1ccrVHKS0a5fHXPp9/wDEdax6AA/vvBmu0G+WPUDb0ldTiR/gUCbOTZosXbfMqdeUFmOAN+/wmS1/UJ1baNUrlxqd4pktltTiqj3UP+4/oIHW4i7bHl/06RPb9RKGp4mkkBfisep+cUjiKCg8bMRjYnWyUSjgyOIosUSijZizFkospjJA7kCdyg9kemJxVj76+o+k7G3rDaeX5L6O/Eu2ROm0IR5B0GdJWBPKdw6m8IR5mK+sup1tddsfWYcQayax9RqILTrAwgNMmS9HzvJwdKglqyAtWXoM9YH6SxXIMpUX4Matbo6kNvrqNxHNc4lP/F5O0uvJtVRz9W0a3HK5DIdAdddO3T0gtRUzldc4Pz6zq3prUUq+oP0xsRMtrHkqBWxrnlPeaUjlKNGfZ0KrZRDy5xzHbAGevTc7TQ/+OoFJZ2Lb82gAPc9frL+EHkqOX9leU6nQZDDQHvrH4hdvVP4VEHB95tsjz7L+f5m3etGUWeHnapT9vXB5ST1GAR8dZqVKXIcfL0keF2iogVTnHvHux3/faaRpB1xsehmYVba8lyae+jGqNnSebcboFHdcYweYenTHzHynoVdijEHQg4M5HxbgujdSCp9On5z08T+xJL/TFLn9ZAnAkUfQekYnSek4FkpziIPK3MoDqVQEYkKqwRKmIQKmZKM0U8gilvLGiy2djwrwRTRs12FQY0UZUA9zrkzaXwxZ/wD0J9fvNENLFMw5NnZJAKeErI/+BfgWH6we58HWWNKWPR3+86K3Mhc7SZP2Wjj28H2p/hcejn9YFc+A0P8A26rDycAj5jE61TrLAYUpexijzul4Mrq+rJy6+0Ce2mmMwe5o1KLcrgg/Q+YPWeh1XxknQdZxnHbp7g8qHCA6Due5mZSyezcI10A0r49YWlyDMUKyHlb4HpCUfExKCOhu0zmWOnWB2dXOkPVsfScWqMkKVQqZrUHDjzmXUp5lSVGQzLVl7NatSkadYqdYre8D6HeTrIJn+SbXZdTqg7SwPjeZNTK6iK34lnTMuJuKs30CmB3VPkyfjHoVwZO5PMMd9JCPRVa3Q0ENZVfGQDggjPcdZzNAleucHB+G82bK4laoGklmj75z1Gf13hIt1RcIoA8uvme8ESpggzRpvze7r+nrMO+jDVO0DWg39YfQpsdToPrHo26r5nOfIeksZpeOGK2c+XlUnoxPE3ICpAPMQcnoQPPvPPfEVcFkHUfqR9p3Pja65bbnAJKso0xgc2VyT2yRPKGuHdwSdSw/Oezhg39iKX1SJodPmPrExkFbf1jF56Tm+xy0iTGigDGSR5GMYBf+LHg+YoolHs4MkDIKJIicTsGWxiuDpIWxj3J0kAAp1limUqdZYpgoBxYH8N8b8p/KclbONJ21cTEr8AVmJRuQnpjK/cTMlZ1hJLswuJqjIRMnh4LEc22ceuJ0l14VqEEvVUAAnQEnA18pkWlBQ3Kdwp5f9WmP1lWo0XTdmxQs0wMD6mWD2DgnI6H7wO0uSpIbcRX91hc+Y/OcXFtm5JUakg9PMFt64cDBhyknbeYejkDGnyzRtKuRgwG5yBtBra685GrNLZvNTBGJzl/bOjEqMqe24m9b3AYSq5wQYi6ZLcWYltfMNNRNy0uufAM55yOY43mhw6rrgzco+S3YFxau1Cucj/puOYHsdmHz1/3TRtLoHBBmjd2qVk5HGRuD1B7ichVR7Wpyt7h1U9MeX6iaVTVeUZTrTO2oXORNCzuypyPQjvORtr4bzVo3GdV7fKcmqNOKqmdeK4IyNoLeXyIpaoyovVmOB8O5nPVeIOtKoaeCyqSobUZA10nmd/fVKzc1V2Y9MnQZ/lGwHpO/Fx57PJKNM7LxL4uR0ehRQcjDlZ3GNP6E6ep+U42gupPYHA8zpKUuCNCM/nJmqvc/KeqMFFUiqiQijKwO0eUy+xRRRoAojHjYgEYpLEUFo9jVpJnlPNFmcjoHWrSdxtB7VpbcNpMlAOssQyjm1k1aASqyFPePVMgh1gF9UZBB2IIPxnnvELdkdgcgg6H8j8Z6C5gl9w1K64fQ9GG4+48oNJ0edNUIOSTNXhaq4y4B7AjOIVxLwvyKW/EyMjTlxv31gWQnKVOhG3UEaEGSW0dotM0qtmqap7JGuOh+0vtawyDAzd8wgFpdHlHlOLi2iSSOtrKpGonMcQpchyvymzbXXOvnMfjqHl5h0OozuO+JIJ3RzWmPYXpBm2p5h6zk7apgjtOlsH2Eso0als52/dqdVgwyufodiIZSfZlOkO8QWgIDgf0t6dD9cfGYtF+Q46TdqUSRZ01ldZEXF7QV6ZX+Iaoex7eh2mXbVddJsUHzONOLtCSONsa5BKNoQcYO4x0mvaXTYxLeP8LJK1UUltnC7kY0bA3IxM+zqbgztKpK0VS+p0li+w7nB/WcBxW1/Dqun8rED/SdV+hE7/hVFvfIwP4c9fP0lnEOCUavOzKOZ1xzdRgaEduk3wvG7OUlZ5eRIwq8tWpsyMMMD8+xHlKAus9VnGi5BoJKKFWvDqtT3EYjvjC/3HSZbLQKI4GdB8hOhtfDJ/8AI+P6U1P9xm/a2FOkPYQA992PxMw5o0onJ2XAaz6kcg7tv/bvN628OUk1fLnz0X+0frNdTJOZhzbN4pA60lGgVAOmgjSyKQB1tV5hLuaZ/Dn0hbNEeiyVMPtjLLjaC2rwmo2kpDN6y5REw1k0igQqSCDWEMsigihYzSdEyTCPTWAUX1LnVlPUY+04LitsUfDDB+jeY7z0Sos5XxRXLsKWcKAGPckyPR0hbdGDbtnfaB0GwxXOx+nSatLhyY1J+ZmU9qEqYByDsZFTs0+ze4fUIMfxLa89EsN0IY+Y2P55+EDtapE3KL86FT1BE5XjKzMlZx/D2yvKdxt6TZsq5GB2glDgdZVapy4RQdSdWAODyiKk+s6cmwujpgedGU9RiU23hsEZqNqRsnT1JGsqsqk37GplfQ4+058a3Rh6OPubZ6DlW+B6EdDDrevpnM6PiHDErAc+QQNCN8dvOZdLw6FP/cYjtygH55/SblCzeSZbY1edhgban/M0ns6ZPMUQt/MVUn54kLagqDlUYH1PmT1hb7TUY4ow2Dfh6yVSngSdMxq7zdEMXi3BEuF9r2XHuuN/Q9xMCj4Pfm9t1C/0gkkfHb6ztklbmVNrRGkZdhwGhTwQnMf5n9o+uNhNOquksSRqyMoCViKy6KShZQFjsJdiPiKFgvLFLoooA3Dm0mgTALBNIYUMiWjUuwi23hdSA22h1h3MDKiMpKxIInOsmiwQsCx/w5UHlywCIEsAjhIswCDzE43wU1iHQhXAwc5ww6ZI2M3Jb+HI0WMmnaOL/wCQXA/k/uP2g1Xwzcuw9wY2PN9hO5ZYyIYUaNZs88urdkco2MqcHGx9JoWTGb3G+AiqS6tyuRsfdJHftMG24bcKcGmR55XHrnM5yizSpo6DhzZUr2P0b9mc5xTgD08tTBdOw1ZR6dR5zrOHWnIuCcsdT29BCQJuMdbOalTOFsEdyAisx64GAPUnQTrLO2KKATk7k+flNFjpKl1MKKWw5WNmRIlrrIhZshUiyxxpJJTjVtIBTmVsMyarmSKQCFNdJCoNYRy4ErCZMUCKLIVhCCmJVUggLyR1SW8kZFihZHkjMIQ9OUMsULKcRSXJHigB2OcTUQaQa3TAhawkabA67EHSNSqtCHpc0upWoEzWwQUE6yaVOkOt7cGU3lNU1lIJUzGZSJCzuwYb+KsjkWgdahxEjGEF1jq6yZCgVyZI1jjaEh1idljIUBozE7QnOBJI6yRqrLkSgCvUY9JWhYzRYrHVlkyLQGGIiJMMDrEzrLkSjOdmkqeYeSsZHWMhQBVqmVl2EPblzHcLiMhQAlRu0rqOxmmnLI4XMZCjPViJP8Qw1wsShcRkKM96jGKnV5d4aoWRdFzLkKBa1YmClzNRlWVqixYozzVO0upZEIKLmWNiWyUCu5MgNIUhWQbEWKKefyilvIIpMiUD05azYEUU0aKKVYkwwOY8UiDG/wCJKyiq5fcxRSPs0NbW4WXuYopzl2CxNRJUxFFAI1DrJt7sUUAajGbeKKAWNtEsUUAqB1k3MUUAnnSVoYooBGodZJj7MUUAjSMcnWKKANWOkamYooBEHWNWMUU0BlOkqRtYooMkqpiLaRRQCmk+sVVtYooBLmiiigH/2Q=="
                  alt="category icon"
                />
                {transaction.category.name}
              </div>
            </div>
            <div className={"popup__info__item"}>
              Created: {new Date(transaction.createdAt).toLocaleString()}
            </div>
            {transaction.note && (
              <div className={"popup__info__item"}>
                Note: {transaction.note}
              </div>
            )}
                        <EditIcon onClick={() => setIsEditMode(true)} className={"popup__info__edit-icon"}/>
          </div>
        )}
        <div className={"popup__row"}>
          
          <button
            onClick={() => setIsDeletePopupOpen(true)}
            className={"button expense"}
          >
            Delete
          </button>
          <button onClick={closePopupHandle} className={"button"}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionInfo;