import {useEffect, useState} from "react";
import Navbar from "./components/Navbar.jsx";
import Card from "./components/Card.jsx";
import axios from "axios";

export default function App() {
    // State for active tab
    const [activeTab, setActiveTab] = useState('Dashboard');


    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Agar activeTab 'Employees' hai, tabhi call karna hai to wo check bhi laga sakta hai
        if (activeTab === 'Employees') {
            axios.get('http://localhost:8080/emps/all') // Yahaan teri Java API ka URL aayega
                .then((response) => {
                    // Jab data aa jaye, to usse state me set kar de
                    setUsers(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [activeTab]); // Dependency me activeTab daala taaki jab tab change ho to check ho


    return (
        <div className="w-full min-h-screen bg-slate-900 font-inter">
            {/* Navbar activeLink aur setActiveLink ko prop ke through le raha hai */}
            <Navbar activeLink={activeTab} setActiveLink={setActiveTab} />

            <div className="p-10 text-slate-200 flex flex-wrap justify-center gap-10">

                {/* Condition: Sirf tab dikhana jab activeTab 'Employees' ho */}
                {activeTab === 'Employees' && users.map((elem, index) => (
                    <Card
                        key={index}
                        name={elem.name}
                        email={elem.email}
                        empId={elem.id}
                    />
                ))}

                {/* Agar Employees tab nahi hai */}
                {activeTab !== 'Employees' && (
                    <div className="text-center mt-20">
                        <h1 className="text-3xl font-bold text-slate-400">Welcome to {activeTab}</h1>
                        <p className="text-slate-500 mt-2">Select "Employees" to view the team.</p>
                    </div>
                )}
            </div>
        </div>
    );
}