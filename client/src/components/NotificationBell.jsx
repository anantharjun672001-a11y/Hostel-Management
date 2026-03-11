import { useEffect, useState } from "react";
import axios from "axios";

const NotificationBell = () => {

  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {

    const fetchNotifications = async () => {

      const { data } = await axios.get(
        "http://localhost:3000/api/notification",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications(data);

    };

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 5000);

    return () => clearInterval(interval);

  }, []);

  const markAsRead = async (id) => {

    await axios.put(
      `http://localhost:3000/api/notification/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setNotifications((prev) =>
      prev.map((n) =>
        n._id === id ? { ...n, read: true } : n
      )
    );

  };

  const unread = notifications.filter((n) => !n.read).length;

  return (

    <div className="relative">

      <button
        onClick={() => setOpen(!open)}
        className="relative text-xl"
      >
        🔔

        {unread > 0 && (

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
            {unread}
          </span>

        )}

      </button>

      {open && (

        <div className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-50">

          <div className="px-4 py-2 font-semibold border-b">
            Notifications
          </div>

          <div className="max-h-64 overflow-y-auto">

            {notifications.length === 0 ? (

              <p className="p-4 text-gray-500 text-sm">
                No notifications
              </p>

            ) : (

              notifications.map((n) => (

                <div
                  key={n._id}
                  onClick={() => markAsRead(n._id)}
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                    !n.read ? "font-semibold bg-gray-50" : ""
                  }`}
                >
                  {n.message}
                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>

  );

};

export default NotificationBell;