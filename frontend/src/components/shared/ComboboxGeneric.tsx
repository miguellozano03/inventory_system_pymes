import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";

interface ComboboxGenericProps {
  items: string[];
  placeholder?: string;
  emptyMessage?: string;
  onSelect?: (value: string) => void;
}

export function ComboboxGeneric({
  items,
  placeholder = "Select an option",
  emptyMessage = "No items found.",
  onSelect,
}: ComboboxGenericProps) {
  return (
    <Combobox items={items} onValueChange={onSelect}>
      <ComboboxInput placeholder={placeholder} />
      <ComboboxContent>
        <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>
        <ComboboxList>
          {(item) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}