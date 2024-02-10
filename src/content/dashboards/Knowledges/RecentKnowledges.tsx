import { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { KnowledgeData } from 'src/models/knowledges';
import RecentKnowledgesTable from './RecentKnowledgesTable';
import axios from 'axios';
// import {API, graphqlOperation} from 'aws-amplify';
import { listNarejiroDevTables } from 'src/graphql/queries';

function RecentKnowledges() {
  const [data, setData] = useState();
  
  const listNarejiroDevTables = async() => {
    // const API_URL = "https://wrfsrnb3mbdcpozxhklwonjaf4.appsync-api.ap-northeast-1.amazonaws.com/graphql"; //process.env.API_URL as string;
    // const API_KEY = "da2-kxj5lbhbwrfnncqkueuaemayqe"; //process.env.API_KEY as string;
    const API_URL = "https://4js3hfxbu5eqfh3mj3wqoyzosy.appsync-api.ap-northeast-1.amazonaws.com/graphql"; //process.env.API_URL as string;
    const API_KEY = "da2-a3wirkvc6ncmnp62bkcc4go37u"; //process.env.API_KEY as string;
    const query = `
    query listNarejiroDevTables {
      listNarejiroDevTables(filter: {PK: {eq: "KWL#data"}}) {
        items {
          PK
          SK
          cat1
          cat2
          cat3
          title
          content
          createdAt
          createdBy
          updatedAt
          updatedBy
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
    console.log(res.data.data.listNarejiroDevTables.items);
    setData(res.data.data.listNarejiroDevTables.items);
  }

  const fetchNarejiroDevTablesData = async () => {
    try {
        // const todoData = await API.graphql(graphqlOperation(listNarejiroDevTables));
        // const todoList = todoData.data.listTodos.items;
        // setData(todoData);
    } catch (error) {
        console.error('Error fetching todos:', error);
    }
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
