import { useState, useEffect } from 'react';
import {
  Card, graphqlApiCall, graphqlApiResult,
  RecentKnowledgesTable, KnowledgeData, listKnowledgeDatas
} from './index';

function RecentKnowledges() {
  const [data, setData] = useState<KnowledgeData[]>();
  
  const callApiListKnowledgeDatas = async() => {
    const res: any = await graphqlApiCall(listKnowledgeDatas);
    const result: boolean = graphqlApiResult(res.listNarejiroDevTables.items);    
    if(result){ setData(res.listNarejiroDevTables.items); };
  };

  useEffect(() => {
    callApiListKnowledgeDatas();
  },[]);
  const KnowledgeDatas: KnowledgeData[] = data;

  return (
    <Card>
      <RecentKnowledgesTable KnowledgeDatas={KnowledgeDatas} />
    </Card>
  );
}

export default RecentKnowledges;

