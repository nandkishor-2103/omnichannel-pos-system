import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Field, Form, Formik, type FieldProps } from "formik";

type CategoryData = {
  id: number;
  name: string;
};

const categoryList: CategoryData[] = [
  {
    id: 234,
    name: "vegetables",
  },
  {
    id: 435,
    name: "clothes",
  },
  {
    id: 678,
    name: "electronics",
  },
];

const loading: boolean = false;

export type ProductFormValues = {
  name: string;
  sku: string;
  description: string;
  mrp: string;
  sellingPrice: string;
  brand: string;
  categoryId: string;
  color: string;
  image: string;
};

type ProductFormProps = {
  initialValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  onCancel?: () => void;
  isEditing?: boolean;
};

export default function ProductForm({
  initialValues,
  onSubmit,
  onCancel,
  isEditing = false,
}: ProductFormProps) {
  const defaultValues = {
    name: "",
    sku: "",
    description: "",
    mrp: "",
    sellingPrice: "",
    brand: "",
    categoryId: "",
    color: "",
    image: "",
    ...initialValues,
  };

  const handleSubmit = (values: ProductFormValues) => {
    console.log("Product Data: ", values);
    onSubmit(values);
  };

  return (
    <Formik initialValues={defaultValues} onSubmit={handleSubmit} enableReinitialize>
      {({ isSubmitting, setFieldValue }) => (
        <Form className="space-y-4 py-2 pr-2">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium">
              Product Name
            </label>
            <Field
              as={Input}
              id="name"
              name="name"
              placeholder="Enter product name"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="sku" className="block text-sm font-medium">
              SKU
            </label>
            <Field as={Input} id="sku" name="sku" placeholder="Enter SKU" type="text" />
          </div>

          <div className="space-y-2">
            <label htmlFor="brand" className="block text-sm font-medium">
              Brand
            </label>
            <Field
              as={Input}
              id="brand"
              name="brand"
              placeholder="Enter brand"
              type="text"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="categoryId" className="block text-sm font-medium">
              Category
            </label>
            <Field as={Input} name="categoryId">
              {({ field }: FieldProps) => (
                <Select
                  value={field.value}
                  onValueChange={(value) => setFieldValue("categoryId", value)}
                >
                  <SelectTrigger className="w-1/2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    {categoryList.map((category) => (
                      <SelectItem key={category.id} value={category.id.toString()}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="mrp" className="block text-sm font-medium">
                MRP
              </label>
              <Field
                as={Input}
                id="mrp"
                name="mrp"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="sellingPrice" className="block text-sm font-medium">
                Selling Price
              </label>
              <Field
                as={Input}
                id="sellingPrice"
                name="sellingPrice"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="color" className="block text-sm font-medium">
                Color
              </label>
              <Field
                as={Input}
                id="color"
                name="color"
                placeholder="Enter product color"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="block text-sm font-medium">
                Image URL
              </label>
              <Field as={Input} id="image" name="image" placeholder="Paste image URL" />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium">
                Description
              </label>
              <Field
                as={Textarea}
                id="description"
                name="description"
                placeholder="Enter product description"
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              {onCancel && (
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={"outline"}
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                disabled={isSubmitting || loading}
              >
                {isEditing ? "Update Product" : "Add Product"}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
