import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import { useForm } from "react-hook-form";

export default function TaskHookForm({ kisiler, submitFn }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset
  } = useForm({
    defaultValues: {
      title: "",
      people: [],
      status: "yapılacak",
    },
    mode: "onChange",
  });

  function submitFunction(data) {
    const task = {
      id: nanoid(5),
      status: "yapılacak",
      ...data,
    };
    submitFn(task);
    reset();
  }
  return (
    <form className="taskForm" onSubmit={handleSubmit(submitFunction)}>
      <div className="form-line">
        <label className="input-label" htmlFor="title">
          Başlık
        </label>
        <input
          className="input-text"
          id="title"
          type="text"
          {...register("title", {
            required: "Task başlığı yazmalısınız",
            minLength: {
              value: 3,
              message: "Task başlığı en az 3 karakter olmalı",
            },
          })}
        />
        {errors.title && <div> {errors.title.message} </div>}
      </div>

      <div className="form-line">
        <label className="input-label" htmlFor="description">
          Açıklama
        </label>
        <textarea
          className="input-textarea"
          rows="3"
          id="description"
          {...register("description", {
            required: "Task açıklaması yazmalısınız",
            minLength: {
              value: 10,
              message: "Task açıklaması en az 10 karakter olmalı",
            },
          })}
        ></textarea>
        {errors.description && <div> {errors.description.message} </div>}
      </div>

      <div className="form-line">
        <label className="input-label">İnsanlar</label>
        <div>
          {kisiler.map((p) => (
            <label className="input-checkbox" key={p}>
              <input
                type="checkbox"
                value={p}
                {...register("people", {
                  required: "Lütfen en az bir kişi seçin",
                  validate: {
                    maxLength: (arr) =>
                      arr.length < 4 || "En fazla 3 kişi seçebilirsiniz",
                  },
                })}
              />
              {p}
            </label>
          ))}
          {errors.people && <div> {errors.people.message} </div>}
        </div>
      </div>

      <div className="form-line">
        <button className="submit-button" type="submit" disabled={!isValid}>
          Kaydet
        </button>
      </div>
    </form>
  );
}
