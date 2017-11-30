/**
 * Contains utility functions for edit distance
 *
 * I translated the code from java into javascript from geeks for geeks:
 *    http://www.geeksforgeeks.org/dynamic-programming-set-5-edit-distance/
 */
class Utility {
  /**
   * Take the min of 3 elements
   */
  static min(x, y, z) {
    return Math.min(Math.min(x, y), z);
  }

  /**
   * Calculate the edit distance between two strings
   *
   * @param String first string
   * @param String second string
   * @return int the edit distance between the two strings
   */
  static editDistance(s1, s2) {
    let m = s1.length;
    let n = s2.length;

    // 2D array of size [m+1][n+1]
    let dp = new Array(m+1);
    for (var i = 0; i < m+1; i++) {
      let row = new Array(n+1);
      dp[i] = row;
    }

    for (var i = 0; i <= m; i++) {
      for (var j = 0; j <= n; j++) {

        // first string is empty, so insert all items from second string
        if (i == 0) {
          dp[i][j] = j;
        }

        // second string is empty, so remove all items from first string
        else if (j == 0) {
          dp[i][j] = i;
        }

        // characters are same, ignore and recurse for rest of string
        else if (s1[i-1] == s2[j-1]) {
          dp[i][j] = dp[i-1][j-1];
        }

        // Characters are different. Consider insert/remove/replace and take
        // the minimum
        else {
          dp[i][j] = 1 + Utility.min(dp[i][j-1], // insert
                                     dp[i-1][j], // remove
                                     dp[i-1][j-1]); // replace
        }
      }
    }

    return dp[m][n];
  }
}

export default Utility;
