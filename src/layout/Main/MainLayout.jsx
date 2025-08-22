import AdminDashboard from '../../dashboard/AdminDashboard'
import AgentDashboard from '../../dashboard/AgentDashboard'
import CustomerDashboard from '../../dashboard/CustomerDashboard'
import Header from '../Header/Header'

const MainLayout = () => {
    return (
        <div>
            <Header/>
            <AgentDashboard />
            <AdminDashboard />
            <CustomerDashboard />
        </div>
    )
}

export default MainLayout