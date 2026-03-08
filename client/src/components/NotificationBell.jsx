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
        },
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
      },
    );

    setNotifications((prev) =>
      prev.map((n) => (n._id === id ? { ...n, read: true } : n)),
    );
  };

  const unread = notifications.filter((n) => !n.read).length;

  return (
    <div className="relative cursor-pointer" onClick={() => setOpen(!open)}>
      🔔
      {unread > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
          {unread}
        </span>
      )}
      {open && (
        <div className="absolute right-0 mt-2 bg-white text-black shadow p-2 w-64">
          {notifications.length === 0 ? (
            <p>No notifications</p>
          ) : (
            notifications.map((n) => (
              <p
                key={n._id}
                onClick={() => markAsRead(n._id)}
                className={
                  !n.read ? "font-bold cursor-pointer" : "cursor-pointer"
                }
              >
                {n.message}
              </p>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
