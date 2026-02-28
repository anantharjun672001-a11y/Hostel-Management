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
    <div>
      <h2>Notifications</h2>

      {notifications.map((n) => (
        <div key={n._id}>
          <p>{n.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Notifications;