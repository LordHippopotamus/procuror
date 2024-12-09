import { Fieldset, Legend, Field, Label, Textarea } from "@headlessui/react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const DocumentEditor = ({
  formAction,
  defaultValues = { title: "", content: "", timestamp: new Date() },
}: {
  formAction: (formData: FormData) => void;
  defaultValues?: { title: string; content: string; timestamp: Date };
}) => {
  return (
    <form action={formAction}>
      <Fieldset className="flex flex-col gap-2">
        <Legend className="text-4xl font-light tracking-widest uppercase text-center text-amber-950">
          Редактирование документа
        </Legend>

        <Field className="flex flex-col">
          <Label>Название</Label>
          <Input name="title" defaultValue={defaultValues.title} />
        </Field>
        <Field className="flex flex-col">
          <Label>Содержимое</Label>
          <Textarea
            name="content"
            defaultValue={defaultValues.content}
            className="border border-blue-400 p-2 min-h-36 max-h-screen"
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
          />
        </Field>

        <Button className="ml-auto mt-2" type="submit">
          Сохранить
        </Button>
      </Fieldset>
    </form>
  );
};

export default DocumentEditor;
