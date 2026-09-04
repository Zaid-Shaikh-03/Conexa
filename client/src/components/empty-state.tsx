import Logo from "./logo";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "./ui/empty";

interface Props {
  title?: string;
  descriptions?: string;
}

const EmptyState = ({
  title = "No chat selected",
  descriptions = "Pick a chat or start a new one...",
}: Props) => {
  return (
    <Empty className="w-full h-full flex-1 flex items-center justify-center bg-muted/20">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <Logo showText={false} />
        </EmptyMedia>
        <EmptyTitle>{title}</EmptyTitle>
        <EmptyDescription>{descriptions}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
};

export default EmptyState;
