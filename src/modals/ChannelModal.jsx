// ../modals/ChannelModal.js
import React, { useState, useEffect } from "react";
import { Modal, Input, Button, Select } from "antd";

const ChannelModal = ({ open, onCancel, initialData }) => {
  const [form, setForm] = useState({
    채널코드: "",
    채널명: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    } else {
      setForm({ 채널코드: "", 채널명: "" });
    }
  }, [initialData]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    // TODO: redux dispatch (createChannel / updateChannel) 연결
    console.log("저장할 데이터:", form);
    onCancel();
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
      title={initialData ? "채널 수정" : "채널 등록"}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={550}
      centered
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div>
          <label style={labelStyle}>채널코드</label>
          <Input
            style={inputStyle}
            value={form.채널코드}
            onChange={(e) => handleChange("채널코드", e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>온/오프라인</label>
          <Select
            style={inputStyle}
            value={form.채널명}
            onChange={(value) => handleChange("채널명", value)}
          >
            <Select.Option value="온라인">온라인</Select.Option>
            <Select.Option value="오프라인">오프라인</Select.Option>
          </Select>
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

export default ChannelModal;
