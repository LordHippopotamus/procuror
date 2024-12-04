import {
  Fieldset,
  Input,
  Legend,
  Field,
  Label,
  Textarea,
} from "@headlessui/react";

const DocumentEditor = ({
  formAction,
  defaultValues = { title: "", content: "", timestamp: new Date() },
}: {
  formAction: (formData: FormData) => void;
  defaultValues?: { title: string; content: string; timestamp: Date };
}) => {
  return (
    <form action={formAction} className="px-2 mx-auto max-w-4xl my-8">
      <Fieldset className="flex flex-col gap-2">
        <Legend className="text-2xl font-bold">Редактирование документа</Legend>

        <Field className="flex flex-col">
          <Label>Название</Label>
          <Input
            name="title"
            defaultValue={defaultValues.title}
            className="border border-slate-400 focus:outline focus:outline-slate-800 p-2 rounded-md"
          />
        </Field>
        <Field className="flex flex-col">
          <Label>Содержимое</Label>
          <Textarea
            name="content"
            defaultValue={defaultValues.content}
            className="border border-slate-400 focus:outline focus:outline-slate-800 p-2 rounded-md min-h-36 max-h-screen"
          />
        </Field>
        <Field className="flex flex-col">
          <Label>Дата</Label>
          <Input
            name="timestamp"
            type="date"
            defaultValue={defaultValues.timestamp
              .toISOString()
              .substring(0, 10)}
            className="border border-slate-400 focus:outline focus:outline-slate-800 p-2 rounded-md"
          />
        </Field>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 active:bg-slate-700 text-slate-100 transition">
            Сохранить
          </button>
        </div>
      </Fieldset>
    </form>
  );
};

export default DocumentEditor;
