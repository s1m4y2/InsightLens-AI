import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

interface Props {
    children: React.ReactNode;
}

export default function DashboardLayout({
    children,
}: Props) {
    return (
        <div className="flex min-h-screen bg-slate-100">

            <Sidebar />

            <div className="flex-1">

                <Navbar />

                <main className="flex-1 p-8">

                    {children}

                </main>

            </div>

        </div>
    );
}