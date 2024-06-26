import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

import { useNavigate } from "react-router-dom";
import UserService from "services/user.service";
import AuthService from "services/auth.service";
import TitleBar from "components/Community/TitleBar";

export default function AdminDashboard() {
  const currentUser = AuthService.getCurrentUser();

  const navagate = useNavigate();
  if (currentUser.roles[0] !== "ROLE_ADMIN") {
    navagate("/dashboard");
  }

  const [users, setUsers] = useState([]);
  useEffect(() => {
    UserService.getAllUsers().then((res) => setUsers(res.data));
    setLoading(false);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  const createdAtBodyTemplate = (rowData) => {
    return formatDate(rowData.createdAt);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    username: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    email: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [loading, setLoading] = useState(true);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };
  const renderHeader = () => {
    return (
      <div className="flex justify-content-end">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Keyword Search"
          />
        </span>
      </div>
    );
  };
  const header = renderHeader();

  const paymentBodyTemplate = (rowData) => {
    if (rowData.subscriptionid) {
      return "true"
    } else {
      return "false"
    }
  };


  return (
    <div className="overflow-x-auto scrollbar-thumb scrollbar-track h-screen flex-auto justify-center">
      <div className="card pt-6 h-[100vh] flex flex-col">
        <div className="h-full">

        <DataTable
          value={users}
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          stripedRows
          tableStyle={{ minWidth: "50rem" }}
          dataKey="id"
          filters={filters}
          filterDisplay="row"
          loading={loading}
          globalFilterFields={["username", "email"]}
          header={header}
          emptyMessage="No customers found."
        >
          <Column
            field="id"
            header="Id"
            sortable
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="username"
            header="Username"
            sortable
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            sortable
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="freeAttempts"
            header="FreeATP"
            sortable
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="subscription"
            header="isPayment?"
            body={paymentBodyTemplate}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="createdAt"
            header="Created At"
            sortable
            body={createdAtBodyTemplate}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="updatedAt"
            header="Updated At"
            sortable
            body={createdAtBodyTemplate}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
        </DataTable>
        </div>
        <TitleBar className="items-end"/>
      </div>
    </div>
  );
}
