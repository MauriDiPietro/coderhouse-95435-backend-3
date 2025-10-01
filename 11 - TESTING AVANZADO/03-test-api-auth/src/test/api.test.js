import { describe, test } from "node:test";
import assert from "node:assert";
import { createUserMock } from "../utils/mock.js";

const API_URL = "http://localhost:8080/api";

describe("tests API USERS", () => {
  let userRegister = null;
  let cookieToken = null;

  test("[POST] /register", async () => {
    const body = createUserMock();

    // console.log(body);

    userRegister = {
      email: body.email,
      password: body.password,
    };

    const responsePromise = await fetch(`${API_URL}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const response = await responsePromise.json();

    // console.log(response)

    assert.equal(response.message, "Success");
    assert.equal(response.status, 200);
    assert.ok(response.data._id);
    assert.equal(response.data.email, body.email);
    assert.equal(response.data.first_name, body.first_name);
    assert.equal(response.data.last_name, body.last_name);
    assert.equal(response.data.age, body.age);
    assert.rejects();
  });

  test("[POST] /login", async () => {
    const responsePromise = await fetch(`${API_URL}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userRegister),
      credentials: "include",
    });

    const response = await responsePromise.json();

    assert.equal(response.message, "Success");
    assert.equal(response.status, 200);
    assert.ok(responsePromise.headers.get("set-cookie"));
    // assert.ok(responsePromise.headers.get("authorization"));

    const setCookieHeader = responsePromise.headers.get("set-cookie");
    /*
token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGRkMjI
yOTVlYThhODdjNmEzY2Y1ZjYiLCJpYXQiOjE3NTkzMjI2NzQsImV4cCI6MTc1OTMyM
zU3NH0.aw5wrZQuzUw9KKQ3kDK44wgjGmj2KkWb6mlcgJ6rHrs; Path=/; HttpOnly
    */

    cookieToken = setCookieHeader.split(";")[0];

    /*
    {
    "status": 200,
    "message": "Success",
    "data": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGRkMjIyOTVlYThhODdjNmEzY2Y1ZjYiLCJpYXQiOjE3NTkzMjI2NzQsImV4cCI6MTc1OTMyMzU3NH0.aw5wrZQuzUw9KKQ3kDK44wgjGmj2KkWb6mlcgJ6rHrs"
    */
    // cookieToken = response.data
  });

  test("[GET] /profile-cookies", async () => {
    const responsePromise = await fetch(`${API_URL}/users/profile-cookies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieToken,
        // Authorization: `Bearer ${cookieToken}`
      },
      credentials: "include",
    });
    const response = await responsePromise.json();
    console.log(response);

    assert.equal(response.data.email, userRegister.email);
    assert.equal(response.status, 200);
    assert.equal(response.message, "Success");
  });
});
