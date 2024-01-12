import { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { KnowledgeData } from 'src/models/knowledges';
import RecentKnowledgesTable from './RecentKnowledgesTable';
import { subDays } from 'date-fns';
import axios from 'axios';

function RecentKnowledges() {
  const [data, setData] = useState();
  useEffect(() => {
    const API_URL = "https://wrfsrnb3mbdcpozxhklwonjaf4.appsync-api.ap-northeast-1.amazonaws.com/graphql"; //process.env.API_URL as string;
    const API_KEY = "da2-kxj5lbhbwrfnncqkueuaemayqe"; //process.env.API_KEY as string;
    const listKnowledges = async() => {
      const query = `
      query listKnowledgeDatas {
        listKnowledgeDatas {
          items {
            PK
            SK
            cat1
            cat2
            cat3
            created_at
            created_by
            scan_index
            updated_at
            updated_by
            last_id
            title
            content
            ref_mtrl_path
            ref_mtrl_name
            ref_red_url
            ref_link_url
            ref_attch_url
            note
          }
        }
      }      
      `;
      const res = await axios.post(
        API_URL,
        {
          query: query,
        },
        {
          headers: {
            "x-api-key": API_KEY,
          }
        }
      );
      console.log(res.data.data.listKnowledgeDatas.items);
      setData(res.data.data.listKnowledgeDatas.items);
    }
    listKnowledges();
  },[]);
  const KnowledgeDatas: KnowledgeData[] = data;

  return (
    <Card>
      <RecentKnowledgesTable KnowledgeDatas={KnowledgeDatas} />
    </Card>
  );
}

export default RecentKnowledges;
