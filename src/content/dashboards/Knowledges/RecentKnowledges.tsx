import { useState, useEffect } from 'react';
import {
  API_URL, API_KEY, Card, axios,
  RecentKnowledgesTable, KnowledgeData, listKnowledges
} from './index';

function RecentKnowledges() {
  const [data, setData] = useState<KnowledgeData[]>();
  
  const listNarejiroDevTables = async() => {
    const res = await axios.post(
      API_URL,
      { query: listKnowledges },
      { headers: {"x-api-key": API_KEY} }
    );
    console.log(res.data.data.listNarejiroDevTables.items);
    setData(res.data.data.listNarejiroDevTables.items);
  };

  useEffect(() => {
    listNarejiroDevTables();
  },[]);
  const KnowledgeDatas: KnowledgeData[] = data;

  return (
    <Card>
      <RecentKnowledgesTable KnowledgeDatas={KnowledgeDatas} />
    </Card>
  );
}

export default RecentKnowledges;

