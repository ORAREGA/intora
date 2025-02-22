import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const NotificationColumn = ({ title, notifications, markAsRead, unreadCount }) => (
  <div className="notification-column">
    <h2>
      {title} <span className="notification-count">({unreadCount})</span>
    </h2>
    <ul className="notification-list">
      {notifications.map((notif, index) => (
        <li
          key={notif.id || index}
          className={`notification-item ${notif.read ? "read" : "unread"}`}
          onClick={() => markAsRead(notif.id)}
        >
          <strong>{notif.type.toUpperCase()}:</strong> {notif.message}
          <br />
          <small>{new Date(notif.timestamp).toLocaleString()}</small>
        </li>
      ))}
    </ul>
  </div>
);

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = io("http://147.93.107.225:5000"); // Replace with your backend URL

    // Listen for incoming notifications
    socket.on("new-notification", (data) => {
      setNotifications((prev) => [data, ...prev]); // Add new notification to the top
    });

    // Fetch existing notifications on component mount
    fetch("http://147.93.107.225:5000/notifications")
      .then((response) => response.json())
      .then((data) => setNotifications(data))
      .catch((error) => console.error("Error fetching notifications:", error));

    return () => {
      socket.disconnect();
    };
  }, []);

  const markAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationsByType = (type) => notifications.filter((notif) => notif.type === type);

  const notificationTypes = [
    { type: "estimate", title: "Get Estimate Form" },
    { type: "enquiry", title: "Enquiry Form" },
    { type: "consultation", title: "Consultation Form" },
    { type: "contact", title: "Contact Form" },
  ];

  return (
    <div className="notifications-container">
      {notificationTypes.map(({ type, title }) => {
        const filteredNotifications = getNotificationsByType(type);
        const unreadCount = filteredNotifications.filter((notif) => !notif.read).length;

        return (
          <NotificationColumn
            key={type}
            title={title}
            notifications={filteredNotifications}
            markAsRead={markAsRead}
            unreadCount={unreadCount}
          />
        );
      })}
    </div>
  );
};

export default Notifications;
