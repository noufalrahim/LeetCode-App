export const CONSTANTS = {
  APP_NAME: 'LeetCode',
  APP_VERSION: '1.0.0',
  APP_DESCRIPTION:
    'LeetCode is a platform for learning and practicing coding skills.',
  APP_AUTHOR: 'LeetCode',
};

export const API = {
  BASE_URL: 'https://leetcode-stats-api.herokuapp.com/',
};

export const COLORS = {
  dark: '#1A1A1A',
  light: '#FFFFFF',
};

// export const API = {
//     BASE_URL: 'https://leetcode.com/api',
//     PROBLEMS: '/problems/all',
//     PROBLEM: '/problems/',
//     GRAPHQL: '/graphql',
//     GRAPHQL_ENDPOINT: 'https://leetcode.com/graphql',
//     GRAPHQL_QUERY: `
//     query questionData($titleSlug: String!) {
//       question(titleSlug: $titleSlug) {
//         questionId
//         questionFrontendId
//         title
//         titleSlug
//         content
//         difficulty
//         stats
//         similarQuestions
//         topicTags {
//           name
//           slug
//         }
//       }
//     }
//     `,
//     GRAPHQL_HEADERS: {
//         'Content-Type': 'application/json',
//         'x-csrftoken': 'undefined',
//         'x-definition-name': 'questionData',
//         'x-operation-name': 'questionData',
//     },
//     GRAPHQL_METHOD: 'POST',
//     GRAPHQL_MODE: 'cors',
//     GRAPHQL_CREDENTIALS: 'include',
//     GRAPHQL_REDIRECT: 'follow',
//     GRAPHQL_REFERRER: 'https://leetcode.com/problems/two-sum/',
//     GRAPHQL_USER_AGENT: 'Mozilla/5.0',
//     GRAPHQL_ORIGIN: 'https://leetcode.com',
//     GRAPHQL_HOST: 'leetcode.com',
//     GRAPHQL_ACCEPT: '*/*',
//     GRAPHQL_ACCEPT_ENCODING: 'gzip, deflate, br',
//     GRAPHQL_ACCEPT_LANGUAGE: 'en-US,en;q=0.9',
//     GRAPHQL_BODY: {
//         operationName: 'questionData',
//         variables: {
//             titleSlug: 'two-sum',
//         },
//         query: `
//         query questionData($titleSlug: String!) {
//           question(titleSlug: $titleSlug) {
//             questionId
//             questionFrontendId
//             title
//             titleSlug
//             content
//             difficulty
//             stats
//             similarQuestions
//             topicTags {
//               name
//               slug
//             }
//           }
//         }
//         `,
//     },
//     GRAPHQL_BODY_TWO_SUM: {
//         operationName: 'questionData',
//         variables: {
//             titleSlug: 'two-sum',
//         },
//         query: `
//         query questionData($titleSlug: String!) {
//           question(titleSlug: $titleSlug) {
//             questionId
//             questionFrontendId
//             title
//             titleSlug
//             content
//             difficulty
//             stats
//             similarQuestions
//             topicTags {
//               name
//               slug
//             }
//           }
//         }
//         `,
//     },
// }
