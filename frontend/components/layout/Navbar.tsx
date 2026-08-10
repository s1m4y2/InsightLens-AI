"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
    Bell,
    Search,
    LayoutDashboard,
    FileText,
    Brain,
    FileBarChart,
    ScrollText,
    MessageSquare,
    Download,
    Sparkles,
    LogIn,
} from "lucide-react";

import {
    getNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    Notification,
} from "@/services/notification.service";


export default function Navbar() {

    const router = useRouter();

    // =========================
    // SEARCH
    // =========================

    const [search, setSearch] = useState("");

    const inputRef =
        useRef<HTMLInputElement>(null);


    // =========================
    // NOTIFICATIONS
    // =========================

    const [notificationOpen, setNotificationOpen] =
        useState(false);

    const [notifications, setNotifications] =
        useState<Notification[]>([]);

    const [unreadCount, setUnreadCount] =
        useState(0);

    const notificationRef =
        useRef<HTMLDivElement>(null);


    // =========================
    // CTRL + K
    // =========================

    useEffect(() => {

        const handle = (e: KeyboardEvent) => {

            if (
                (e.ctrlKey || e.metaKey) &&
                e.key.toLowerCase() === "k"
            ) {

                e.preventDefault();

                inputRef.current?.focus();

            }

        };

        window.addEventListener(
            "keydown",
            handle
        );

        return () => {

            window.removeEventListener(
                "keydown",
                handle
            );

        };

    }, []);


    // =========================
    // LOAD NOTIFICATIONS
    // =========================

    useEffect(() => {

        async function loadNotifications() {

            try {

                const data =
                    await getNotifications();

                setNotifications(
                    data.items.slice(0, 6)
                );

                setUnreadCount(
                    data.unread_count
                );

            } catch (error) {

                console.error(
                    "Failed to load notifications:",
                    error
                );

            }

        }


        loadNotifications();


        const interval = setInterval(
            loadNotifications,
            5000
        );


        return () => {

            clearInterval(interval);

        };

    }, []);


    // =========================
    // CLOSE NOTIFICATION
    // WHEN CLICKING OUTSIDE
    // =========================

    useEffect(() => {

        const handleClickOutside = (
            event: MouseEvent
        ) => {

            if (
                notificationRef.current &&
                !notificationRef.current.contains(
                    event.target as Node
                )
            ) {

                setNotificationOpen(false);

            }

        };

        document.addEventListener(
            "mousedown",
            handleClickOutside
        );

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            );

        };

    }, []);


    // =========================
    // NOTIFICATION ICON
    // =========================

    function getNotificationIcon(
        type: string
    ) {

        switch (type) {

            case "prompt":
                return FileText;

            case "report":
                return Download;

            case "ai":
                return Sparkles;

            case "login":
                return LogIn;

            default:
                return Bell;

        }

    }


    // =========================
    // NOTIFICATION COLOR
    // =========================

    function getNotificationColor(
        type: string
    ) {

        switch (type) {

            case "prompt":
                return "text-indigo-600";

            case "report":
                return "text-green-600";

            case "ai":
                return "text-purple-600";

            case "login":
                return "text-sky-600";

            default:
                return "text-slate-600";

        }

    }


    // =========================
    // BELL CLICK
    // =========================

    async function handleNotificationToggle() {

        const nextOpen =
            !notificationOpen;

        setNotificationOpen(
            nextOpen
        );


        // Bell açılıyorsa
        // okunmamış bildirimleri okundu yap

        if (
            nextOpen &&
            unreadCount > 0
        ) {

            try {

                await markAllNotificationsAsRead();


                setNotifications(
                    (current) =>
                        current.map(
                            (notification) => ({
                                ...notification,
                                is_read: true,
                            })
                        )
                );


                setUnreadCount(0);

            } catch (error) {

                console.error(
                    "Failed to mark notifications as read:",
                    error
                );

            }

        }

    }


    // =========================
    // SINGLE NOTIFICATION CLICK
    // =========================

    async function handleNotificationClick(
        notification: Notification
    ) {

        try {

            if (!notification.is_read) {

                await markNotificationAsRead(
                    notification.id
                );


                setNotifications(
                    (current) =>
                        current.map(
                            (item) =>
                                item.id ===
                                notification.id
                                    ? {
                                        ...item,
                                        is_read: true,
                                    }
                                    : item
                        )
                );


                setUnreadCount(
                    (count) =>
                        Math.max(
                            0,
                            count - 1
                        )
                );

            }

        } catch (error) {

            console.error(
                "Failed to mark notification as read:",
                error
            );

        }


        // Bildirime tıklayınca dropdown kapanır

        setNotificationOpen(false);

    }


    // =========================
    // SEARCH PAGES
    // =========================

    const pages = [

        {
            name: "Dashboard",
            keywords: [
                "dashboard",
                "home"
            ],
            href: "/dashboard",
            icon: LayoutDashboard,
        },

        {
            name: "Reviews",
            keywords: [
                "review",
                "reviews"
            ],
            href: "/reviews",
            icon: MessageSquare,
        },

        {
            name: "AI Analyze",
            keywords: [
                "analyze",
                "analysis",
                "ai"
            ],
            href: "/analyze",
            icon: Brain,
        },

        {
            name: "Prompt Management",
            keywords: [
                "prompt",
                "prompts"
            ],
            href: "/prompts",
            icon: FileText,
        },

        {
            name: "Reports",
            keywords: [
                "report",
                "reports"
            ],
            href: "/reports",
            icon: FileBarChart,
        },

        {
            name: "AI Logs",
            keywords: [
                "logs",
                "history"
            ],
            href: "/logs",
            icon: ScrollText,
        },

    ];


    const results = useMemo(() => {

        if (!search.trim()) {

            return [];

        }


        const query =
            search.toLowerCase();


        return pages.filter(
            (page) =>

                page.name
                    .toLowerCase()
                    .includes(query)

                ||

                page.keywords.some(
                    (keyword) =>
                        keyword.includes(
                            query
                        )
                )
        );

    }, [search]);


    // =========================
    // RENDER
    // =========================

    return (

        <header
            className="
                flex
                items-center
                justify-between
                border-b
                bg-white
                px-8
                py-4
            "
        >

            {/* =========================
                LEFT
            ========================= */}

            <div>

                <h2 className="text-2xl font-bold">

                    InsightLens AI

                </h2>

                <p className="text-sm text-slate-500">

                    AI-powered Customer Review Analytics

                </p>

            </div>


            {/* =========================
                RIGHT
            ========================= */}

            <div className="flex items-center gap-5">


                {/* =========================
                    SEARCH
                ========================= */}

                <div className="relative">

                    <Search
                        className="
                            absolute
                            left-3
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                        "
                        size={18}
                    />


                    <input
                        ref={inputRef}
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        type="text"
                        placeholder="Search... (Ctrl + K)"
                        className="
                            w-80
                            rounded-xl
                            border
                            bg-slate-50
                            py-2
                            pl-10
                            pr-4
                            outline-none
                            focus:ring-2
                            focus:ring-indigo-500
                        "
                        onKeyDown={(e) => {

                            if (
                                e.key === "Enter" &&
                                results.length > 0
                            ) {

                                router.push(
                                    results[0].href
                                );

                                setSearch("");

                            }

                        }}
                        onBlur={() => {

                            setTimeout(
                                () =>
                                    setSearch(""),
                                150
                            );

                        }}
                    />


                    {/* SEARCH RESULTS */}

                    {results.length > 0 && (

                        <div
                            className="
                                absolute
                                z-50
                                mt-2
                                w-full
                                overflow-hidden
                                rounded-xl
                                border
                                bg-white
                                shadow-xl
                            "
                        >

                            {results.map(
                                (page) => {

                                    const Icon =
                                        page.icon;

                                    return (

                                        <button
                                            key={
                                                page.href
                                            }
                                            onClick={() => {

                                                router.push(
                                                    page.href
                                                );

                                                setSearch("");

                                            }}
                                            className="
                                                flex
                                                w-full
                                                items-center
                                                gap-3
                                                px-4
                                                py-3
                                                text-left
                                                hover:bg-slate-100
                                            "
                                        >

                                            <Icon
                                                size={18}
                                                className="
                                                    rounded-lg
                                                    bg-indigo-100
                                                    p-1
                                                    text-indigo-600
                                                "
                                            />

                                            {page.name}

                                        </button>

                                    );

                                }
                            )}

                        </div>

                    )}


                    {/* NO SEARCH RESULT */}

                    {search &&
                        results.length === 0 && (

                            <div
                                className="
                                    absolute
                                    z-50
                                    mt-2
                                    w-full
                                    rounded-xl
                                    border
                                    bg-white
                                    p-4
                                    text-sm
                                    text-slate-500
                                    shadow-xl
                                "
                            >

                                No matching pages found.

                            </div>

                        )}

                </div>


                {/* =========================
                    NOTIFICATION
                ========================= */}

                <div
                    ref={notificationRef}
                    className="relative"
                >

                    <button
                        type="button"
                        onClick={
                            handleNotificationToggle
                        }
                        className="
                            relative
                            rounded-xl
                            border
                            p-2
                            hover:bg-slate-100
                        "
                    >

                        <Bell size={20} />


                        {/* UNREAD BADGE */}

                        {unreadCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -right-1
                                    -top-1
                                    flex
                                    h-5
                                    w-5
                                    items-center
                                    justify-center
                                    rounded-full
                                    bg-red-500
                                    text-[10px]
                                    font-bold
                                    text-white
                                "
                            >

                                {unreadCount}

                            </span>

                        )}

                    </button>


                    {/* =========================
                        NOTIFICATION DROPDOWN
                    ========================= */}

                    {notificationOpen && (

                        <div
                            className="
                                absolute
                                right-0
                                z-50
                                mt-3
                                w-96
                                overflow-hidden
                                rounded-2xl
                                border
                                bg-white
                                shadow-2xl
                            "
                        >

                            {/* HEADER */}

                            <div
                                className="
                                    border-b
                                    p-4
                                "
                            >

                                <h2 className="font-bold">

                                    Notifications

                                </h2>

                                <p className="text-sm text-slate-500">

                                    Recent activities

                                </p>

                            </div>


                            {/* EMPTY */}

                            {notifications.length === 0 ? (

                                <div className="p-8 text-center">

                                    <Bell
                                        className="
                                            mx-auto
                                            h-8
                                            w-8
                                            text-slate-300
                                        "
                                    />

                                    <p
                                        className="
                                            mt-3
                                            text-sm
                                            font-medium
                                            text-slate-600
                                        "
                                    >

                                        No notifications

                                    </p>

                                    <p
                                        className="
                                            mt-1
                                            text-xs
                                            text-slate-400
                                        "
                                    >

                                        You're all caught up.

                                    </p>

                                </div>

                            ) : (

                            /* NOTIFICATIONS */

                            <div className="max-h-[420px] overflow-y-auto">

                                {notifications.slice(0, 6).map(
                                    (item) => {

                                        const Icon =
                                            getNotificationIcon(
                                                item.type
                                            );

                                        const color =
                                            getNotificationColor(
                                                item.type
                                            );

                                        return (

                                            <button
                                                key={item.id}
                                                type="button"
                                                onClick={() =>
                                                    handleNotificationClick(
                                                        item
                                                    )
                                                }
                                                className={`
                                                    flex
                                                    w-full
                                                    items-start
                                                    gap-4
                                                    border-b
                                                    p-4
                                                    text-left
                                                    hover:bg-slate-50
                                                    ${
                                                        !item.is_read
                                                            ? "bg-indigo-50/40"
                                                            : ""
                                                    }
                                                `}
                                            >

                                                {/* ICON */}

                                                <div
                                                    className={`
                                                        rounded-xl
                                                        bg-slate-100
                                                        p-2
                                                        ${color}
                                                    `}
                                                >

                                                    <Icon
                                                        size={18}
                                                    />

                                                </div>


                                                {/* CONTENT */}

                                                <div
                                                    className="
                                                        min-w-0
                                                        flex-1
                                                    "
                                                >

                                                    <div
                                                        className="
                                                            flex
                                                            items-start
                                                            justify-between
                                                            gap-3
                                                        "
                                                    >

                                                        <h3 className="font-semibold">

                                                            {item.title}

                                                        </h3>


                                                        {!item.is_read && (

                                                            <span
                                                                className="
                                                                    mt-1
                                                                    h-2
                                                                    w-2
                                                                    shrink-0
                                                                    rounded-full
                                                                    bg-indigo-600
                                                                "
                                                            />

                                                        )}

                                                    </div>


                                                    <p
                                                        className="
                                                            mt-1
                                                            text-sm
                                                            text-slate-500
                                                        "
                                                    >

                                                        {item.description}

                                                    </p>

                                                </div>

                                            </button>

                                        );

                                    }
                                )}

                            </div>

                        )}

                        </div>

                    )}

                </div>


                {/* =========================
                    SEPARATOR
                ========================= */}

                <div
                    className="
                        h-8
                        w-px
                        bg-slate-200
                    "
                />


                {/* =========================
                    PROFILE
                ========================= */}

                <div
                    className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        bg-gradient-to-r
                        from-indigo-600
                        to-violet-600
                        text-sm
                        font-bold
                        text-white
                    "
                >

                    S

                </div>

            </div>

        </header>

    );

}