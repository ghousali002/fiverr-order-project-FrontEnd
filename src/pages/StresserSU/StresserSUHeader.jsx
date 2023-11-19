import React from 'react'

function StresserSUHeader() {
  return (
    <>
    <div className="modal fade" id="help-hub" tabIndex="-1" aria-labelledby="exampleModalRightLabel" aria-hidden="true">
        <div className="modal-dialog modal-dialog-vertical" role="document">
          <div className="modal-content border-0 min-vh-100">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalRightLabel">Help</h5>
              <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
        <h5 className="fs-0">Target</h5>
        <p className="fs--1">Your target, must be URL (https://example.com/).</p>
        <hr/>
        <h5 className="fs-0">Request type</h5>
        <p className="fs--1">Allowing you to choose between GET/POST. Use POST method with POST DATA on a login page or other page using post data, will give you better results.</p>
        <hr/>
        <h5 className="fs-0">Origin</h5>
        <p className="fs--1">Allows you to choose the origin country of the requests sent.</p>
        <hr/>
        <h5 className="fs-0">Ratelimit Bypass</h5>
        <p className="fs--1">If your target limit the number of request at each seconds bypass will be the best choice else use it as default to send lots of request.</p>
        <hr/>
        <h5 className="fs-0">Referer</h5>
        <p className="fs--1">This is from where the request come from.</p>
        <hr/>
        <h5 className="fs-0">Cookie</h5>
        <p className="fs--1">Send custom cookies in the header.</p>
        <hr/>
        <h5 className="fs-0">User-Agent</h5>
        <p className="fs--1">Send a custom user-agent in the header.</p>
        <hr/>
        <h5 className="fs-0">Attack Time</h5>
        <p className="fs--1">Attack Time indicates how long you can launch an attack per target in seconds.</p>
        <hr/>
        <h5 className="fs-0">Attack Method</h5>
        <p className="fs--1">Attack method used for your Stress Test, read our documentation to know all the available methods.</p>
        <hr/>
        <h5 className="fs-0">Simultaneous Attacks (concurrents)</h5>
        <p className="fs--1">Number of concurrent used to initiate an attack. Each concurrent is handled by a different server.</p>
        <hr/>
      </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="card mb-3">
            <div className="bg-holder d-none d-lg-block bg-card bg-start-header"></div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-8" style={{ zIndex: 10 }}>
                  <h3 className="mb-0">
                    <i class="fas fa-burn">&nbsp;</i> 
                                Attack Hub
                  </h3>
                  <p className="mt-2">
                    You will be able to test the firewall Layer 4 and Layer 7 level of your network applications on this page.
                  </p>
                  <div>
                    <button className="btn" data-bs-toggle="modal" data-bs-target="#help-hub" type="button">
                    <i class="fas fa-life-ring">&nbsp;</i>
                      Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default StresserSUHeader 