import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { FilterMatchMode } from "primereact/api";
import { InputText } from "primereact/inputtext";

// import 'primeflex/primeflex.css';
// import 'primeicons/primeicons.css';

import { useNavigate } from "react-router-dom";
import UserService from "services/user.service";
import AuthService from "services/auth.service";

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

  console.log(users);
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
    return rowData.subscription.subscription === null ? 'false' : 'true';
  };

  return (
    <div className="overflow-x-scroll h-[100vh]">

      <div className="card">
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
            // style={{ width: "30px" }}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="username"
            header="Username"
            sortable
            // style={{ width: "50px" }}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="email"
            header="Email"
            sortable
            // style={{ width: "20%" }}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="freeAttempts"
            header="FreeATP"
            sortable
            // style={{ width: "12%" }}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="subscription"
            header="isPayment?"
            sortable
            body={paymentBodyTemplate}
            headerStyle={{ textAlign: "center" }}
            bodyStyle={{ textAlign: "center" }}
          ></Column>
          <Column
            field="createdAt"
            header="Created At"
            sortable
            // style={{ width: "25%" }}
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
    </div>
  );
}
