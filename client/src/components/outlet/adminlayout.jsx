import { Outlet } from "react-router-dom";

function AdminLayout() {
  return (
    <div>
      <header>Admin header/nav here</header>
      <main>
        <Outlet /> {/* Nested routes like /admin/dashboard will render here */}
      </main>
    </div>
  );
}

export default AdminLayout;
