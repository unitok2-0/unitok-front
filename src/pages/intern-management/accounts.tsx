/* eslint-disable react/jsx-key */
import { BsClock, BsFillCheckCircleFill } from "react-icons/bs";
import Head from "next/head";

import ButtonPrimary from "components/Buttons/ButtonPrimary";
import {
  GenericDropdown,
  GenericDropdownButton,
  GenericDropdownHeader,
} from "components/GenericDropdown";
import Input from "components/Inputs/Input";
import NewTable from "components/NewTable";
import StatusLabel from "components/StatusLabel";

import DashbardContainer from "containers/dashboard";
import useDisclosure from "hooks/useDisclosure";
import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import * as S from "styles/pageStyles/intern-management/styles";
import { withSSRAuth } from "utils/withSSRAuth";
import { getAccounts, Account } from "services/internManagement";
import useDebounce from "hooks/useDebounce";
import { toast } from "react-toastify";
import ProfileModal from "components/ProfileModal";

export type InternManagementAddAccountPageProps = {
  accounts: Account[];
};

export default function InternManagementAddAccountPage(
  props: InternManagementAddAccountPageProps
) {
  const { isOpen, handleClose, handleOpen } = useDisclosure();
  const profileModal = useDisclosure();
  const [filter, setFilter] = useState<"all" | "ACTIVE" | "INACTIVE">("all");
  const [accounts, setAccounts] = useState(props.accounts);
  const [lastAccounts, setLastAccounts] = useState(props.accounts);
  const [selectedAccount, setSelectedAccount] = useState<Account>(null);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search, 350);

  async function loadMode() {
    const updatedSkip = skip + 10;

    try {
      const accounts = await getAccounts(null, {
        skip: updatedSkip,
        search,
        filter: filter !== "all" ? filter : undefined,
      });
      setAccounts((state) => [...state, ...accounts]);
      setLastAccounts(accounts);

      setSkip(updatedSkip);
    } catch {
      toast.error("Erro ao obter mais contas");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const accounts = await getAccounts(null, {
          search: searchDebounced,
          filter: filter !== "all" ? filter : undefined,
        });
        setAccounts(accounts);
        setLastAccounts(accounts);
        setSkip(0);
      } catch {
        toast.error("Erro ao filtrar contas");
      }
    })();
  }, [searchDebounced, filter]);

  function handleSeeAccountDetails(account: Account) {
    setSelectedAccount(account);
    profileModal.handleOpen();
  }

  return (
    <>
      <Head>
        <title>Gestão de contas | Unitok</title>
      </Head>
      {profileModal.isOpen && (
        <ProfileModal
          // bannerChildren={
          //   <div
          //     style={{
          //       display: "flex",
          //       justifyContent: "flex-end",
          //       gap: "1rem",
          //     }}
          //   >
          //     <ButtonPrimary variant="tertiary" colorScheme="white">
          //       {selectedAccount.status === "ACTIVE"
          //         ? "Desativar conta"
          //         : "Ativar conta"}
          //     </ButtonPrimary>
          //     <ButtonPrimary variant="tertiary" colorScheme="white">
          //       Excluir conta
          //     </ButtonPrimary>
          //   </div>
          // }
          modalIsOpen={profileModal.isOpen}
          closeModal={profileModal.handleClose}
          codeId={selectedAccount.profileCode}
        />
      )}
      <DashbardContainer title="Gestão de contas">
        <S.ContentHStack>
          <S.ResponsiveStack>
            <Input
              id="search"
              label="Pesquise por nome"
              rightElement={<BiSearch />}
              style={{ minWidth: "20rem" }}
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />

            <div>
              <GenericDropdown
                shouldShowContent={isOpen}
                onClickOutside={handleClose}
                header={
                  <GenericDropdownHeader
                    onClick={handleOpen}
                    onMouseEnter={handleOpen}
                  >
                    Filtrar contas
                  </GenericDropdownHeader>
                }
              >
                <GenericDropdownButton
                  selected={filter === "all"}
                  onClick={() => setFilter("all")}
                >
                  todas
                </GenericDropdownButton>
                <GenericDropdownButton
                  selected={filter === "ACTIVE"}
                  onClick={() => setFilter("ACTIVE")}
                >
                  ativas
                </GenericDropdownButton>
                <GenericDropdownButton
                  selected={filter === "INACTIVE"}
                  onClick={() => setFilter("INACTIVE")}
                >
                  inativas
                </GenericDropdownButton>
              </GenericDropdown>
            </div>
          </S.ResponsiveStack>

          <NewTable
            gridTemplateColumns="2fr 3fr 1fr"
            tableHeads={["Status da conta", "Usuário", ""]}
            tableData={accounts.map((account) => [
              <StatusLabel
                isActive={account.status === "ACTIVE"}
                activeText="Ativa"
                inactiveText="Inativa"
                activeLeftComponent={<BsFillCheckCircleFill />}
                inactiveLeftComponent={<BsClock />}
              />,
              account.full_name,
              <ButtonPrimary
                variant="tertiary"
                disabled={!account.profileCode}
                onClick={() => handleSeeAccountDetails(account)}
              >
                Ver perfil
              </ButtonPrimary>,
            ])}
          />

          {lastAccounts.length >= 10 && (
            <ButtonPrimary onClick={loadMode}>Ver mais</ButtonPrimary>
          )}
        </S.ContentHStack>
      </DashbardContainer>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    try {
      const accounts = await getAccounts(ctx);

      return {
        props: { accounts },
      };
    } catch {
      return {
        props: { accounts: [] },
      };
    }
  },
  {
    roles: ["ADMIN"],
  }
);
