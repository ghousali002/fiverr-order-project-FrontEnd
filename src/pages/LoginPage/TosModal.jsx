function TosModal({ onClose }) {
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#0E1C2F",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <div
          style={{
            border: "2px solid grey",
            padding: "1em 1em",
            borderRadius: "1em",
            margin: "10%", // Adjusted margin for centering
            width: "80%", // Added width for better responsiveness
          }}
        >
          <h2>Terms of Services</h2>
          <div>
            <p style={{ padding: "1.5em 0em" }}>
              <strong>1. Responsibility</strong>
              <br />
              By using the Server Stress Testing services provided by
              Cryptostresser.com, you agree to be responsible for all actions
              and consequences.
            </p>
            <hr style={{ borderColor: "#d3d3d3", color: "#d3d3d3" }} />
            <p style={{ padding: "1.5em 0em" }}>
              <strong>2. Privacy Policy</strong>
              <br />
              The confidentiality of our customers' data is a priority. We do
              not keep your login and attack logs.
            </p>
            <hr style={{ color: "lightgrey" }} />

            <p style={{ padding: "1.5em 0em" }}>
              <strong>3. Service</strong>
              <br />
              We offer our Server Stress Testing services to individuals and
              businesses only for personal network security testing. You are not
              authorized to use our services to interrupt the connectivity of a
              server/home connection/network. Use this service only on your own
              server/network; if this term is broken, your account will be
              permanently banned. Attacking government websites (.GOV) is
              strictly forbidden!
            </p>
            <hr style={{ color: "lightgrey" }} />

            <p style={{ padding: "1.5em 0em" }}>
              <strong>4. Commitment</strong>
              <br />
              The terms of services will be valid from your first use of our
              services. If you break our TOS, your account will be permanently
              banned from our services.
            </p>
            <hr style={{ color: "lightgrey" }} />

            <p style={{ padding: "1.5em 0em" }}>
              <strong>5. Payment Policy</strong>
              <br />
              If you buy on Cryptostresser.com, you accept our terms and
              conditions. If you have any issues with our services, open a
              ticket; our staff will answer you in a few hours. No refund can be
              made.
            </p>
            <hr style={{ color: "lightgrey", marginBottom: "2em" }} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end", // Align button to the right
              marginTop: "1em", // Add some space between content and button
            }}
          >
            <button
              style={{
                background: "#1A4E93",
                color: "white",
                padding: "0.5em 1em",
                borderRadius: "3px",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              I UNDERSTAND
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default TosModal;
