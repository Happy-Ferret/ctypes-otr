var { libOTR } = require("../libotr.js");

var { Cu } = require("chrome");
Cu.import("resource://gre/modules/ctypes.jsm");

libOTR.init();

exports["test create a userstate"] = function(assert) {
  var userstate = libOTR.otrl_userstate_create();
  assert.ok(!userstate.isNull());
};

exports["test generate a key"] = function(assert) {
  var userstate = libOTR.otrl_userstate_create();
  var account = "account1";
  var protocol = "protocol1";
  var newkey = new ctypes.void_t.ptr();
  var err;
  assert.ok(newkey.isNull());
  err = libOTR.otrl_privkey_generate_start(
    userstate, account, protocol, newkey.address()
  );
  assert.ok(!(err || newkey.isNull()));
  err = libOTR.otrl_privkey_generate_calculate(newkey);
  assert.ok(!err);
};

require("sdk/test").run(exports);
