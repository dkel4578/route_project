import React, { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";

const API_URL = "http://localhost:3001/분류";

const CategoryModal = ({ open, onCancel, initialData, onSuccess }) => {
  const [form, setForm] = useState({
    분류명: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        분류명: initialData.분류명 || "",
      });
    } else {
      setForm({
        분류명: "",
      });
    }
  }, [initialData, open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const preparedData = {
      분류명: form.분류명,
    };

    try {
      if (initialData?.id) {
        await fetch(`${API_URL}/${initialData.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("카테고리가 수정되었습니다 ✅");
      } else {
        await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(preparedData),
        });
        message.success("카테고리가 등록되었습니다 ✅");
      }

      if (typeof onSuccess === "function") onSuccess();
      if (typeof onCancel === "function") onCancel();
    } catch (err) {
      console.error(err);
      message.error("카테고리 저장 실패 ❌");
    }
  };

  const inputStyle = { width: 250, height: 32 };
  const labelStyle = { display: "inline-block", width: 80, marginRight: 8 };

  return (
    <Modal
      title={initialData ? "카테고리 수정" : "카테고리 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      centered
      width={500}
    >
      <div style={{ marginBottom: 16 }}>
        <label style={labelStyle}>분류명</label>
        <Input
          style={inputStyle}
          value={form.분류명}
          onChange={(e) => handleChange("분류명", e.target.value)}
        />
      </div>

      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={onCancel} style={{ marginRight: 10 }}>
          취소
        </Button>
        <Button type="primary" onClick={handleSubmit}>
          {initialData ? "수정" : "등록"}
        </Button>
      </div>
    </Modal>
  );
};

export default CategoryModal;
