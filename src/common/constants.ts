// const API_URL = "https://wrfsrnb3mbdcpozxhklwonjaf4.appsync-api.ap-northeast-1.amazonaws.com/graphql"; //process.env.API_URL as string;
// const API_KEY = "da2-kxj5lbhbwrfnncqkueuaemayqe"; //process.env.API_KEY as string;
export const API_URL = "https://4js3hfxbu5eqfh3mj3wqoyzosy.appsync-api.ap-northeast-1.amazonaws.com/graphql"; //process.env.API_URL as string;
export const API_KEY = "da2-a3wirkvc6ncmnp62bkcc4go37u"; //process.env.API_KEY as string;
export const DEFAULT_TEXT = [
    '# h1: 文頭に「シャープ + スペース」',
    '---',
    '_【italic文字表記】文字列の前後にアンダースコアを記述する_',
    '## h2: 文頭に「シャープx2 + スペース」',
    '---',
    '**【bold(太字)表記】文字列の前後にアスタリスクx2を記述する**',
    '### h3: 文頭に「シャープx3 + スペース」',
    '---',
    '~~【取り消し線表記】文字列の前後に波じるしx2を記述する~~',
    '#### h4: 文頭に「シャープx4 + スペース」',
    '---',
    '` 【引用ハイライト】文字列の前後にバッククオートを記述する `',
    '##### h5: 文頭に「シャープx5 + スペース」',
    '---',
    '``` \n【引用ハイライト】複数行記述する時はバッククオートx3、\n及び「バックスラッシュ + n」を文全体の前後と、各行の最後に記述する\n ```',
    '###### h6: 文頭に「シャープx6 + スペース」',
    '---',
    '- 【箇条書き（黒丸）】文頭にハイフン',
    '- 【箇条書き（黒丸）】文頭にハイフン',
    '1. 【箇条書き（数字）】文頭に「数字 + . + スペース」',
    '1. 【箇条書き（数字）】文頭に「数字 + . + スペース」',
    '---',
    '[Linkは大カッコで囲った文字が表示文字、その後のカッコ内の部分がURL、さらにダブルクオート内はホバー時の表示文字](http://google.com "Google Home")',
  ];
  export const CAT_LIST = [
      {
        SK: 0,
        cat_type: 0,
        cat_name: '新規作成',
        parent_cat_id: 0
      },
      {
        SK: 1,
        cat_type: 1,
        cat_name: 'モール',
        parent_cat_id: 0
      },
      {
        SK: 2,
        cat_type: 1,
        cat_name: 'フロントショップ',
        parent_cat_id: 0
      },
      {
        SK: 3,
        cat_type: 1,
        cat_name: 'OMS',
        parent_cat_id: 0
      },
      {
        SK: 4,
        cat_type: 1,
        cat_name: 'WMS',
        parent_cat_id: 0
      },
      {
        SK: 5,
        cat_type: 2,
        cat_name: '楽天',
        parent_cat_id: 1
      },
      {
        SK: 6,
        cat_type: 2,
        cat_name: 'Amazon',
        parent_cat_id: 1
      },
      {
        SK: 7,
        cat_type: 2,
        cat_name: 'Yahoo',
        parent_cat_id: 1
      },
      {
        SK: 8,
        cat_type: 2,
        cat_name: 'Shopify',
        parent_cat_id: 2
      },
      {
        SK: 9,
        cat_type: 2,
        cat_name: 'EC-force',
        parent_cat_id: 2
      },
      {
        SK: 10,
        cat_type: 2,
        cat_name: 'EC-cube',
        parent_cat_id: 2
      },
      {
        SK: 11,
        cat_type: 2,
        cat_name: '受注',
        parent_cat_id: 3
      },
      {
        SK: 12,
        cat_type: 2,
        cat_name: '商品',
        parent_cat_id: 3
      },
      {
        SK: 13,
        cat_type: 2,
        cat_name: '出荷指示連携',
        parent_cat_id: 4
      },
      {
        SK: 14,
        cat_type: 2,
        cat_name: '出荷実績連携',
        parent_cat_id: 4
      },
      {
        SK: 15,
        cat_type: 2,
        cat_name: '在庫連携',
        parent_cat_id: 4
      },
      {
        SK: 16,
        cat_type: 2,
        cat_name: '商品マスタ連携',
        parent_cat_id: 4
      },
      {
        SK: 17,
        cat_type: 2,
        cat_name: '返品実績連携',
        parent_cat_id: 4
      },
      {
        SK: 18,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 5
      },
      {
        SK: 19,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 5
      },
      {
        SK: 20,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 6
      },
      {
        SK: 21,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 6
      },
      {
        SK: 22,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 7
      },
      {
        SK: 23,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 7
      },
      {
        SK: 24,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 8
      },
      {
        SK: 25,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 8
      },
      {
        SK: 26,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 9
      },
      {
        SK: 27,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 9
      },
      {
        SK: 28,
        cat_type: 3,
        cat_name: '受注連携',
        parent_cat_id: 10
      },
      {
        SK: 29,
        cat_type: 3,
        cat_name: '出荷実績連携',
        parent_cat_id: 10
      },
      {
        SK: 30,
        cat_type: 3,
        cat_name: '受注検索',
        parent_cat_id: 11
      },
      {
        SK: 31,
        cat_type: 3,
        cat_name: '受注更新',
        parent_cat_id: 11
      },
      {
        SK: 32,
        cat_type: 3,
        cat_name: 'CSV受注取込',
        parent_cat_id: 11
      },
      {
        SK: 33,
        cat_type: 3,
        cat_name: '商品登録',
        parent_cat_id: 12
      },
      {
        SK: 34,
        cat_type: 3,
        cat_name: 'CSV商品取込',
        parent_cat_id: 12
      }
  ];