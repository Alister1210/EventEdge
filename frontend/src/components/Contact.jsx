import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Contact = () => {
  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [eventType, setEventType] = useState("");
  const [messageSent, setMessageSent] = useState(false);

  // Event organizer contact data
  const eventContacts = {
    "Birthday Party": [
      { name: "John Doe", contact: "+91 99999 11111" },
      { name: "Priya Sharma", contact: "+91 99999 22222" },
    ],
    Wedding: [
      { name: "Amit Mehta", contact: "+91 99999 33333" },
      { name: "Sonia Kapoor", contact: "+91 99999 44444" },
    ],
    "Game Night": [
      { name: "Vikram Gupta", contact: "+91 99999 55555" },
      { name: "Rohit Roy", contact: "+91 99999 66666" },
    ],
    Anniversary: [
      { name: "Neha Singh", contact: "+91 99999 77777" },
      { name: "Karan Khanna", contact: "+91 99999 88888" },
    ],
  };

  // Handle form submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:4000/api/v1/message/send",
        {
          name,
          email,
          subject,
          message,
          eventType,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(res.data.message);
      setMessageSent(true); // Set messageSent to true only after success

      // Resetting fields except for eventType
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <div className="contact container">
        <div className="banner">
          <div className="item">
            <h4>Address</h4>
            <p>123 Event Plaza, Linking Road, Bandra West, Mumbai, 400050</p>
          </div>
          <div className="item">
            <h4>Call Us</h4>
            <p>+91 98765 43210</p>
          </div>
          <div className="item">
            <h4>Mail Us</h4>
            <p>eventedge@gmail.com</p>
          </div>
        </div>

        <div className="banner">
          <div className="item">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d200098.30699841774!2d72.73097290160555!3d19.10758622314772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1729418412015!5m2!1sen!2sin"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="item">
            <form onSubmit={handleSendMessage}>
              <h2>CONTACT</h2>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                rows={10}
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />

              <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                required
              >
                <option value="" disabled>Select Event Type</option>
                <option value="Birthday Party">Birthday Party</option>
                <option value="Wedding">Wedding</option>
                <option value="Game Night">Game Night</option>
                <option value="Anniversary">Anniversary</option>
              </select>

              <button type="submit">Send</button>
            </form>

            {/* Display event organizers after the message is sent */}
            {messageSent && (
              <div className="event-contacts">
                <h3>Organizers for {eventType}</h3>
                <ul>
                  {eventContacts[eventType]?.map((contact, index) => (
                    <li key={index}>
                      {contact.name}: {contact.contact}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
