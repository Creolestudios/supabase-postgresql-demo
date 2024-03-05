import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface IProps {
  inputId: string;
  handleSuccess: () => void;
  dialogTitle: string;
  actionText: string;
  dialogDescription: string;
  children?: React.ReactElement | string;
}

export function DialogComponent({
  handleSuccess,
  inputId,
  actionText,
  dialogTitle,
  dialogDescription,
  children,
}: IProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button id={inputId}></button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>{dialogDescription}</DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>{children}</div>
        </div>
        <DialogFooter>
          <Button onClick={handleSuccess}>{actionText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
