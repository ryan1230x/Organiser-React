/**
 * @description get query string parameter
 */
export const useQuery = () => {
  return new URLSearchParams(window.location.search);       
};