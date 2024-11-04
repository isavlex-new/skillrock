import { Outlet } from 'react-router-dom';
import DashboardLayout from "../components/DashboardLayout";

const Dashboard = () => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <DashboardLayout>
                <Outlet />  {/* Renders nested routes */}
            </DashboardLayout>
        </div>
    );
};

export default Dashboard;
