import { useState, useEffect } from 'react';
import {
  Card, graphqlApiCall, graphqlApiResult,
  RecentKnowledgesTable, KnowledgeDataType, listKnowledgeData
} from './index';

function RecentKnowledges() {
  const [data, setData] = useState<KnowledgeDataType[]>();
  const KnowledgeDatas: KnowledgeDataType[] = data;

  useEffect(() => {
    callApiListKnowledgeDatas();
  },[]);
  
  const callApiListKnowledgeDatas = async() => {
    const res: any = await graphqlApiCall(listKnowledgeData);
    const result: boolean = graphqlApiResult(res.listNarejiroDevTables.items);    
    if(result){ setData(res.listNarejiroDevTables.items); };
  };

  return (
    <Card>
      <RecentKnowledgesTable KnowledgeDatas={KnowledgeDatas} />
    </Card>
  );
}

export default RecentKnowledges;

