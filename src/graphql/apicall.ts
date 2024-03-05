import axios from 'axios';
import {API_URL, API_KEY} from 'src/common/constants';

export const graphqlApiCall = async(query: String) => {
    console.log('【START】graphqlApiCall()');
    let data: any = null;
    console.log(`[CALLING API] ${query}`);
    await axios.post(
      API_URL,
      { query: query },
      { headers: {"x-api-key": API_KEY} }
    ).then(function(res){
        if(res.data.errors){
            console.log('[API ERROR] Error messages returned from API');
            const errors = res.data.errors;
            errors.map((error) => {
                console.log(`------------------------`);
                console.log(`[ERROR MSG] ${error.message}`);
            });
        };
        if(res.data.data){
            console.log('[API SUCCESS] API returned response successfully');
            data = res.data.data;
            console.log(data);
        };
    }).catch(function(error){
        console.log('[API CALL ERROR] Unexpected error occured while calling API');
        console.log(error);
    }).finally(() => {
    });    
    console.log('【END】graphqlApiCall()');
    return data;
};

export const graphqlApiResult = (res: any) => {
    console.log('【START】graphqlApiResult()');
    let result: boolean = false;
    if(res){
        result = true;
        console.log('[API RESULT: SUCCESS] API reponse data retreived successfully');
        console.log(res);
    }else{
        console.log('[API RESULT: FAIL] API reponse data failed to be retreived');
    }
    console.log('【END】graphqlApiResult()');
    return result;
} ;