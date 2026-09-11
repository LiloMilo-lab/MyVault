"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { Bell } from "lucide-react";

import { usePathname } from "next/navigation";

import type { FinancialAlert } from "@/lib/alerts/generateFinancialAlerts";


type HeaderProps = {
  alerts?: FinancialAlert[];
};


const pageInfo: Record<
  string,
  {
    title: string;
    subtitle: string;
  }
> = {
  "/": {
    title: "Dashboard",
    subtitle: "Welcome back to MyVault",
  },

  "/assets": {
    title: "Portfolio",
    subtitle: "Track and manage your assets.",
  },

  "/transactions": {
    title: "Transactions",
    subtitle: "Manage your financial activity.",
  },

  "/analytics": {
    title: "Analytics",
    subtitle: "Understand your financial performance.",
  },

  "/budgets": {
    title: "Budgets",
    subtitle: "Track and manage your spending limits.",
  },

  "/goals": {
    title: "Financial Goals",
    subtitle: "Plan and track your financial targets.",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Manage your MyVault preferences.",
  },
};


export default function Header({
  alerts = [],
}: HeaderProps) {

  const pathname = usePathname();

  const [isNotificationsOpen, setIsNotificationsOpen] =
    useState(false);

  const notificationRef =
    useRef<HTMLDivElement>(null);


  const currentPage =
    pageInfo[pathname] ?? {
      title: "MyVault",
      subtitle: "Personal Finance OS",
    };


  /* =========================
     CLOSE WHEN CLICKING OUTSIDE
  ========================= */

  useEffect(() => {

    function handleClickOutside(
      event: MouseEvent
    ) {

      if (
        notificationRef.current &&
        !notificationRef.current.contains(
          event.target as Node
        )
      ) {

        setIsNotificationsOpen(false);

      }

    }

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


  /* =========================
     CLOSE WITH ESC KEY
  ========================= */

  useEffect(() => {

    function handleEscape(
      event: KeyboardEvent
    ) {

      if (event.key === "Escape") {

        setIsNotificationsOpen(false);

      }

    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {

      document.removeEventListener(
        "keydown",
        handleEscape
      );

    };

  }, []);


  return (

    <header
      className="
        flex
        items-center
        justify-between
        border-b
        border-neutral-800
        px-8
        py-5
      "
    >

      {/* PAGE TITLE */}

      <div>

        <h2 className="text-2xl font-bold text-white">

          {currentPage.title}

        </h2>

        <p className="text-sm text-neutral-400">

          {currentPage.subtitle}

        </p>

      </div>


      {/* RIGHT SIDE */}

      <div className="flex items-center gap-4">


        {/* NOTIFICATIONS */}

        <div
          ref={notificationRef}
          className="relative"
        >

          <button
            onClick={() =>
              setIsNotificationsOpen(
                (previous) => !previous
              )
            }
            className="
              relative
              rounded-xl
              bg-neutral-900
              p-3
              text-neutral-300
              transition
              hover:text-emerald-400
            "
          >

            <Bell size={20} />

            {alerts.length > 0 && (

              <span
                className="
                  absolute
                  -right-2
                  -top-2
                  flex
                  h-5
                  min-w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-red-500
                  px-1
                  text-xs
                  font-bold
                  text-white
                "
              >

                {alerts.length}

              </span>

            )}

          </button>


          {/* NOTIFICATION DROPDOWN */}

          {isNotificationsOpen && (

            <div
              className="
                absolute
                right-0
                top-14
                z-50
                w-96
                rounded-2xl
                border
                border-neutral-800
                bg-neutral-900
                p-4
                shadow-2xl
              "
            >


              {/* DROPDOWN HEADER */}

              <div
                className="
                  mb-4
                  flex
                  items-center
                  justify-between
                "
              >

                <div>

                  <h3 className="font-bold text-white">

                    Notifications

                  </h3>

                  <p className="text-xs text-neutral-500">

                    {alerts.length} active alerts

                  </p>

                </div>

                <button
                  onClick={() =>
                    setIsNotificationsOpen(false)
                  }
                  className="
                    text-sm
                    text-neutral-500
                    transition
                    hover:text-white
                  "
                >

                  Close

                </button>

              </div>


              {/* ALERT LIST */}

              {alerts.length === 0 ? (

                <div className="py-6 text-center">

                  <p className="text-sm text-emerald-400">

                    Everything looks good! 🎉

                  </p>

                </div>

              ) : (

                <div
                  className="
                    max-h-96
                    space-y-3
                    overflow-y-auto
                  "
                >

                  {alerts.map((alert) => {

                    const color =

                      alert.type === "danger"

                        ? "border-red-500/30 bg-red-500/10"

                        : alert.type === "warning"

                        ? "border-yellow-500/30 bg-yellow-500/10"

                        : alert.type === "success"

                        ? "border-emerald-500/30 bg-emerald-500/10"

                        : "border-blue-500/30 bg-blue-500/10";


                    return (

                      <div
                        key={alert.id}
                        className={`
                          rounded-xl
                          border
                          p-3
                          ${color}
                        `}
                      >

                        <p
                          className="
                            text-sm
                            font-semibold
                            text-white
                          "
                        >

                          {alert.title}

                        </p>

                        <p
                          className="
                            mt-1
                            text-xs
                            text-neutral-400
                          "
                        >

                          {alert.message}

                        </p>

                      </div>

                    );

                  })}

                </div>

              )}

            </div>

          )}

        </div>


        {/* OFFLINE MODE */}

        <div
          className="
            rounded-xl
            bg-neutral-900
            px-5
            py-3
            text-sm
            text-neutral-300
          "
        >

          Offline Mode

        </div>

      </div>

    </header>

  );
}