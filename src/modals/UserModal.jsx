// ../modals/UserModal.js
import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";

const API_URL = "http://localhost:3001/사용자";

const UserModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    name: "",
    password: "",
    age: "",
    email: "",
    city: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ name: "", password: "", age: "", email: "", city: "" });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

 const handleSubmit = async () => {
    try {
      if (initialData) {
        // ✅ 수정 (PUT)
        await fetch(`${API_URL}/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        message.success("사용자가 수정되었습니다 ✅");
      } else {
        // ✅ 신규 등록 (POST)
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        message.success("사용자가 등록되었습니다 ✅");
      }
      onCancel();
    } catch (err) {
      console.error(err);
      message.error("에러가 발생했습니다 ❌");
    }
  };

  const inputStyle = { width: 220, height: 32 };
  const labelStyle = {
    display: "inline-block",
    width: 100,
    textAlign: "right",
    marginRight: 8,
  };

  return (
    <Modal
      title={initialData ? "사용자 수정" : "사용자 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>이름</label>
          <Input
            style={inputStyle}
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>비밀번호</label>
          <Input.Password
            style={inputStyle}
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>나이</label>
          <Input
            style={inputStyle}
            value={form.age}
            onChange={(e) => handleChange("age", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>이메일</label>
          <Input
            style={inputStyle}
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>도시</label>
          <Input
            style={inputStyle}
            value={form.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          저장
        </Button>
      </div>
    </Modal>
  );
};

export default UserModal;
