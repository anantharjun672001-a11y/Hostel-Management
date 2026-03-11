import { useEffect, useState } from "react";
import axios from "axios";

const Notifications = () => {

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {

    const fetch = async () => {

      const { data } = await axios.get(
        "http://localhost:3000/api/notifications",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setNotifications(data);

    };

    fetch();

  }, []);

  return (

    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <h1 className="text-3xl font-bold text-gray-800">
        Notifications
      </h1>

      {notifications.length === 0 ? (

        <div className="bg-white border border-gray-100 shadow rounded-lg p-6 text-gray-500">
          No notifications
        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((n) => (

            <div
              key={n._id}
              className={`p-4 rounded-lg border shadow-sm ${
                !n.read
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-100"
              }`}
            >

              <p className="text-gray-700">
                {n.message}
              </p>

              <p className="text-xs text-gray-400 mt-1">
                {new Date(n.createdAt).toLocaleString()}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

};

export default Notifications;