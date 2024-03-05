'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
interface ITabHead {
  label: string;
  value: string;
}

interface ITabContent {
  value: string;
  component: React.ReactElement;
}

interface IProps {
  tabHeadList: ITabHead[];
  tabContentList: ITabContent[];
}

const getCustomApi = async () => {};
export function TabsComponent({ tabHeadList, tabContentList }: IProps) {
  return (
    <Tabs defaultValue='login' className='w-[400px]' activationMode='manual'>
      <TabsList className='grid w-full grid-cols-2'>
        {tabHeadList.map((tab: ITabHead) => (
          <TabsTrigger value={tab.value} key={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabContentList.map((tab) => (
        <TabsContent value={tab.value} key={tab.value}>
          {tab.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
