<template>
  <div class="about m-auto" style="width: 70rem;">
    <ScrollPanel>
      <article class="p-card my-4" itemtype="https://schema.org/CreativeWork">
        <div class="p-card-body">
          <header class="p-panel-header" aria-label="Content">
            <h1 class="title" itemprop="headline">
              Frequent Pattern (FP) Growth Algorithm In Data Mining
            </h1>
          </header>
          <div class="entry-content" itemprop="text">
            <div id="quads-ad1" class="quads-location quads-ad1" style="float: left; margin: 9px 9px 9px 0">
              <div align="center">
              </div>
            </div>
            <p>
              <strong>Detailed Tutorial On Frequent Pattern Growth Algorithm Which
                Represents The Database in The Form an FP Tree. Includes FP
                Growth Vs Apriori Comparison:</strong>
            </p>
            <p>
              <a href="https://www.softwaretestinghelp.com/apriori-algorithm/"><strong>Apriori Algorithm</strong></a>
              was explained in detail in our previous tutorial. In this
              tutorial, we will learn about Frequent Pattern Growth – FP Growth
              is a method of mining frequent itemsets.
            </p>
            <p>
              As we all know, Apriori is an algorithm for frequent pattern
              mining that focuses on generating itemsets and discovering the
              most frequent itemset. It greatly reduces the size of the itemset
              in the database, however, Apriori has its own shortcomings as
              well.
            </p>
            <p>
              Read through our
              <a href="https://www.softwaretestinghelp.com/data-mining/"><strong>Entire Data Mining Training
                  Series</strong></a>
              for a complete knowledge of the concept.
            </p>
            <p>
              <em><strong><span id="more-101780"></span></strong></em>
            </p>
          </div>
          <p></p>
          <div id="toc_container" class="no_bullets">
            <p class="toc_title">
              What You Will Learn:
              <span class="toc_toggle">[<a href="#">hide</a>]</span>
            </p>
            <ul class="list-group list-group-numbered">
              <li class="list-group-item">
                <a href="/about#Shortcomings_Of_Apriori_Algorithm">Shortcomings Of Apriori Algorithm</a>
              </li>
              <li class="list-group-item">
                <a href="#Frequent_Pattern_Growth_Algorithm">Frequent Pattern Growth Algorithm</a>
              </li>
              <li class="list-group-item"><a href="#FP_Tree">FP Tree</a></li>
              <li class="list-group-item">
                <a href="#Frequent_Pattern_Algorithm_Steps">Frequent Pattern Algorithm Steps</a>
              </li>
              <li class="list-group-item">
                <a href="#Example_Of_FP-Growth_Algorithm">Example Of FP-Growth Algorithm</a>
              </li>
              <li class="list-group-item">
                <a href="#Advantages_Of_FP_Growth_Algorithm">Advantages Of FP Growth Algorithm</a>
              </li>
              <li class="list-group-item">
                <a href="#Disadvantages_Of_FP-Growth_Algorithm">Disadvantages Of FP-Growth Algorithm</a>
              </li>
              <li class="list-group-item">
                <a href="#FP_Growth_vs_Apriori">FP Growth vs Apriori</a>
              </li>
              <li class="list-group-item"><a href="#ECLAT">ECLAT</a></li>
              <li class="list-group-item">
                <a href="#Conclusion">Conclusion</a>
              </li>
              <li class="list-group-item">
                <a href="#Recommended_Reading">Recommended Reading</a>
              </li>
            </ul>
          </div>
          <h3 class="mt-3">
            <span id="Shortcomings_Of_Apriori_Algorithm">Shortcomings Of Apriori Algorithm</span>
          </h3>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">
              Using Apriori needs a generation of candidate itemsets. These
              itemsets may be large in number if the itemset in the database is
              huge.
            </li>
            <li class="list-group-item">
              Apriori needs multiple scans of the database to check the support
              of each itemset generated and this leads to high costs.
            </li>
          </ol>
          <p>
            These shortcomings can be overcome using the FP Growth algorithm.
          </p>
          <h3 class="mt-3">
            <span id="Frequent_Pattern_Growth_Algorithm">Frequent Pattern Growth Algorithm</span>
          </h3>
          <p>
            This algorithm is an improvement to the Apriori method. A frequent
            pattern is generated without the need for candidate generation. FP
            growth algorithm represents the database in the form of a tree
            called a frequent pattern tree or FP tree.
          </p>
          <p>
            This tree structure will maintain the association between the
            itemsets. The database is fragmented using one frequent item. This
            fragmented part is called “pattern fragment”. The itemsets of these
            fragmented patterns are analyzed. Thus with this method, the search
            for frequent itemsets is reduced comparatively.
          </p>
          <h3 class="mt-3"><span id="FP_Tree">FP Tree</span></h3>
          <p>
            Frequent Pattern Tree is a tree-like structure that is made with the
            initial itemsets of the database. The purpose of the FP tree is to
            mine the most frequent pattern. Each node of the FP tree represents
            an item of the itemset.
          </p>
          <p>
            The root node represents null while the lower nodes represent the
            itemsets. The association of the nodes with the lower nodes that is
            the itemsets with the other itemsets are maintained while forming
            the tree.
          </p>
          <h3 class="mt-3">
            <span id="Frequent_Pattern_Algorithm_Steps">Frequent Pattern Algorithm Steps</span>
          </h3>
          <p>
            The frequent pattern growth method lets us find the frequent pattern
            without candidate generation.
          </p>
          <p>
            <strong>
              Let us see the steps followed to mine the frequent pattern using
              frequent pattern growth algorithm:</strong>
          </p>
          <p>
            <strong>#1)</strong> The first step is to scan the database to find
            the occurrences of the itemsets in the database. This step is the
            same as the first step of Apriori. The count of 1-itemsets in the
            database is called support count or frequency of 1-itemset.
          </p>
          <p>
            <strong>#2)</strong> The second step is to construct the FP tree.
            For this, create the root of the tree. The root is represented by
            null.
          </p>
          <p>
            <strong>#3) </strong>The next step is to scan the database again and
            examine the transactions. Examine the first transaction and find out
            the itemset in it. The itemset with the max count is taken at the
            top, the next itemset with lower count and so on. It means that the
            branch of the tree is constructed with transaction itemsets in
            descending order of count.
          </p>
          <p>
            <strong>#4)</strong> The next transaction in the database is
            examined. The itemsets are ordered in descending order of count. If
            any itemset of this transaction is already present in another branch
            (for example in the 1st transaction), then this transaction branch
            would share a common prefix to the root.
          </p>
          <p>
            This means that the common itemset is linked to the new node of
            another itemset in this transaction.
          </p>
          <p>
            <strong>#5)</strong> Also, the count of the itemset is incremented
            as it occurs in the transactions. Both the common node and new node
            count is increased by 1 as they are created and linked according to
            transactions.
          </p>
          <p>
            <strong>#6)</strong> The next step is to mine the created FP Tree.
            For this, the lowest node is examined first along with the links of
            the lowest nodes. The lowest node represents the frequency pattern
            length 1. From this, traverse the path in the FP Tree. This path or
            paths are called a conditional pattern base.
          </p>
          <p>
            Conditional pattern base is a sub-database consisting of prefix
            paths in the FP tree occurring with the lowest node (suffix).
          </p>
          <p>
            <strong>#7)</strong> Construct a Conditional FP Tree, which is
            formed by a count of itemsets in the path. The itemsets meeting the
            threshold support are considered in the Conditional FP Tree.
          </p>
          <p>
            <strong>#8)</strong> Frequent Patterns are generated from the
            Conditional FP Tree.
          </p>
          <h3 class="mt-3">
            <span id="Example_Of_FP-Growth_Algorithm">Example Of FP-Growth Algorithm</span>
          </h3>
          <p><strong>Support threshold=50%, Confidence= 60%</strong></p>
          <p class="text-center">
            <span class="fw-bold text-uppercase"><strong>Table 1</strong></span>
          </p>
          <div id="tablepress-927-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-927" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Transaction</th>
                  <th class="column-2">List of items</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">T1</td>
                  <td class="column-2">I1,I2,I3</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">T2</td>
                  <td class="column-2">I2,I3,I4</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">T3</td>
                  <td class="column-2">I4,I5</td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">T4</td>
                  <td class="column-2">I1,I2,I4</td>
                </tr>
                <tr class="row-6 even">
                  <td class="column-1">T5</td>
                  <td class="column-2">I1,I2,I3,I5</td>
                </tr>
                <tr class="row-7 odd">
                  <td class="column-1">T6</td>
                  <td class="column-2">I1,I2,I3,I4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>Solution:</strong></p>
          <p>Support threshold=50% =&gt; 0.5*6= 3 =&gt; min_sup=3</p>
          <p><strong>1. Count of each item</strong></p>
          <p class="text-center">
            <span class="fw-bold text-uppercase"><strong>Table 2</strong></span>
          </p>
          <div id="tablepress-928-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-928" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Item</th>
                  <th class="column-2">Count</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">I1</td>
                  <td class="column-2">4</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">I2</td>
                  <td class="column-2">5</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">I3</td>
                  <td class="column-2">4</td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">I4</td>
                  <td class="column-2">4</td>
                </tr>
                <tr class="row-6 even">
                  <td class="column-1">I5</td>
                  <td class="column-2">2</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>2. Sort the itemset in descending order.</strong></p>
          <p class="text-center">
            <span class="fw-bold text-uppercase"><strong>Table 3</strong></span>
          </p>
          <div id="tablepress-929-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-929" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Item</th>
                  <th class="column-2">Count</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">I2</td>
                  <td class="column-2">5</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">I1</td>
                  <td class="column-2">4</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">I3</td>
                  <td class="column-2">4</td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">I4</td>
                  <td class="column-2">4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><strong>3. Build FP Tree</strong></p>
          <ol>
            <li>Considering the root node null.</li>
            <li>
              The first scan of Transaction T1: I1, I2, I3 contains three items
              {I1:1}, {I2:1}, {I3:1}, where I2 is linked as a child to root, I1
              is linked to I2 and I3 is linked to I1.
            </li>
            <li>
              T2: I2, I3, I4 contains I2, I3, and I4, where I2 is linked to
              root, I3 is linked to I2 and I4 is linked to I3. But this branch
              would share I2 node as common as it is already used in T1.
            </li>
            <li>
              Increment the count of I2 by 1 and I3 is linked as a child to I2,
              I4 is linked as a child to I3. The count is {I2:2}, {I3:1},
              {I4:1}.
            </li>
            <li>
              T3: I4, I5. Similarly, a new branch with I5 is linked to I4 as a
              child is created.
            </li>
            <li>
              T4: I1, I2, I4. The sequence will be I2, I1, and I4. I2 is already
              linked to the root node, hence it will be incremented by 1.
              Similarly I1 will be incremented by 1 as it is already linked with
              I2 in T1, thus {I2:3}, {I1:2}, {I4:1}.
            </li>
            <li>
              T5:I1, I2, I3, I5. The sequence will be I2, I1, I3, and I5. Thus
              {I2:4}, {I1:3}, {I3:2}, {I5:1}.
            </li>
            <li>
              T6: I1, I2, I3, I4. The sequence will be I2, I1, I3, and I4. Thus
              {I2:5}, {I1:4}, {I3:3}, {I4 1}.
            </li>
          </ol>
          <p>
            <a href="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/FP-Tree.png"><img
                class="alignnone size-full wp-image-102235 entered lazyloaded"
                src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/FP-Tree.png" alt="FP Tree"
                data-lazy-src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/FP-Tree.png"
                data-ll-status="loaded" width="132" height="275" /><noscript><img
                  class="alignnone size-full wp-image-102235"
                  src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/FP-Tree.png" alt="FP Tree"
                  width="132" height="275" /></noscript></a>
          </p>
          <p><strong>4. Mining of FP-tree is summarized below:</strong></p>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">
              The lowest node item I5 is not considered as it does not have a
              min support count, hence it is deleted.
            </li>
            <li class="list-group-item">
              The next lower node is I4. I4 occurs in 2 branches ,
              {I2,I1,I3:,I41},{I2,I3,I4:1}. Therefore considering I4 as suffix
              the prefix paths will be {I2, I1, I3:1}, {I2, I3: 1}. This forms
              the conditional pattern base.
            </li>
            <li class="list-group-item">
              The conditional pattern base is considered a transaction database,
              an FP-tree is constructed. This will contain {I2:2, I3:2}, I1 is
              not considered as it does not meet the min support count.
            </li>
            <li class="list-group-item">
              This path will generate all combinations of frequent patterns :
              {I2,I4:2},{I3,I4:2},{I2,I3,I4:2}
            </li>
            <li class="list-group-item">
              For I3, the prefix path would be: {I2,I1:3},{I2:1}, this will
              generate a 2 node FP-tree : {I2:4, I1:3} and frequent patterns are
              generated: {I2,I3:4}, {I1:I3:3}, {I2,I1,I3:3}.
            </li>
            <li class="list-group-item">
              For I1, the prefix path would be: {I2:4} this will generate a
              single node FP-tree: {I2:4} and frequent patterns are generated:
              {I2, I1:4}.
            </li>
          </ol>
          <div id="tablepress-930-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-930" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Item</th>
                  <th class="column-2">Conditional Pattern Base</th>
                  <th class="column-3">Conditional FP-tree</th>
                  <th class="column-4">Frequent Patterns Generated</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">I4</td>
                  <td class="column-2">{I2,I1,I3:1},{I2,I3:1}</td>
                  <td class="column-3">{I2:2, I3:2}</td>
                  <td class="column-4">{I2,I4:2},{I3,I4:2},{I2,I3,I4:2}</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">I3</td>
                  <td class="column-2">{I2,I1:3},{I2:1}</td>
                  <td class="column-3">{I2:4, I1:3}</td>
                  <td class="column-4">{I2,I3:4}, {I1:I3:3}, {I2,I1,I3:3}</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">I1</td>
                  <td class="column-2">{I2:4}</td>
                  <td class="column-3">{I2:4}</td>
                  <td class="column-4">{I2,I1:4}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            The diagram given below depicts the conditional FP tree associated
            with the conditional node I3.
          </p>
          <p>
            <a
              href="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png"><img
                class="alignnone wp-image-102234 size-full entered lazyloaded"
                src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png"
                alt="conditional FP tree associated with conditional node I3"
                data-lazy-srcset="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png 557w, https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3-300x87.png 300w"
                data-lazy-sizes="(max-width: 557px) 100vw, 557px"
                data-lazy-src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png"
                data-ll-status="loaded" sizes="(max-width: 557px) 100vw, 557px" srcset="
                  https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png        557w,
                  https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3-300x87.png 300w
                " width="557" height="162" /><noscript><img class="alignnone wp-image-102234 size-full"
                  src="https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png"
                  alt="conditional FP tree associated with conditional node I3" width="557" height="162" srcset="
                    https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3.png        557w,
                    https://www.softwaretestinghelp.com/wp-content/qa/uploads/2019/09/conditional-FP-tree-associated-with-conditional-node-I3-300x87.png 300w
                  " sizes="(max-width: 557px) 100vw, 557px" /></noscript></a>
          </p>
          <h3>
            <span id="Advantages_Of_FP_Growth_Algorithm">Advantages Of FP Growth Algorithm</span>
          </h3>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">
              This algorithm needs to scan the database only twice when compared
              to Apriori which scans the transactions for each iteration.
            </li>
            <li class="list-group-item">
              The pairing of items is not done in this algorithm and this makes
              it faster.
            </li>
            <li class="list-group-item">
              The database is stored in a compact version in memory.
            </li>
            <li class="list-group-item">
              It is efficient and scalable for mining both long and short
              frequent patterns.
            </li>
          </ol>
          <h3>
            <span id="Disadvantages_Of_FP-Growth_Algorithm">Disadvantages Of FP-Growth Algorithm</span>
          </h3>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item">
              FP Tree is more cumbersome and difficult to build than Apriori.
            </li>
            <li class="list-group-item">It may be expensive.</li>
            <li class="list-group-item">
              When the database is large, the algorithm may not fit in the
              shared memory.
            </li>
          </ol>
          <h3><span id="FP_Growth_vs_Apriori">FP Growth vs Apriori</span></h3>
          <div id="tablepress-931-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-931" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">FP Growth</th>
                  <th class="column-2">Apriori</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">
                    <strong>Pattern Generation</strong>
                  </td>
                  <td class="column-2"></td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">
                    FP Growth generates pattern by constructing a FP tree
                  </td>
                  <td class="column-2">
                    Apriori generates pattern by pairing the items into
                    singletons, pairs and triplets.
                  </td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">
                    <strong>Candidate Generation</strong>
                  </td>
                  <td class="column-2"></td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">There is no candidate generation</td>
                  <td class="column-2">Apriori uses candidate generation</td>
                </tr>
                <tr class="row-6 even">
                  <td class="column-1"><strong>Process</strong></td>
                  <td class="column-2"></td>
                </tr>
                <tr class="row-7 odd">
                  <td class="column-1">
                    The process is faster as compared to Apriori. The runtime of
                    process increases linearly with increase in number of
                    itemsets.
                  </td>
                  <td class="column-2">
                    The process is comparatively slower than FP Growth, the
                    runtime increases exponentially with increase in number of
                    itemsets
                  </td>
                </tr>
                <tr class="row-8 even">
                  <td class="column-1"><strong>Memory Usage</strong></td>
                  <td class="column-2"></td>
                </tr>
                <tr class="row-9 odd">
                  <td class="column-1">
                    A compact version of database is saved
                  </td>
                  <td class="column-2">
                    The candidates combinations are saved in memory
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <h3><span id="ECLAT">ECLAT</span></h3>
          <p>
            The above method, Apriori and FP Growth, mine frequent itemsets
            using horizontal data format. ECLAT is a method of mining frequent
            itemsets using the vertical data format. It will transform the data
            in the horizontal data format into the vertical format.
          </p>
          <p>
            <strong><span style="text-decoration: underline">For Example,</span>
              Apriori and FP Growth use:</strong>
          </p>
          <div id="tablepress-932-scroll-wrapper" class="">
            <table id="tablepress-932" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Transaction</th>
                  <th class="column-2">List of items</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">T1</td>
                  <td class="column-2">I1,I2,I3</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">T2</td>
                  <td class="column-2">I2,I3,I4</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">T3</td>
                  <td class="column-2">I4,I5</td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">T4</td>
                  <td class="column-2">I1,I2,I4</td>
                </tr>
                <tr class="row-6 even">
                  <td class="column-1">T5</td>
                  <td class="column-2">I1,I2,I3,I5</td>
                </tr>
                <tr class="row-7 odd">
                  <td class="column-1">T6</td>
                  <td class="column-2">I1,I2,I3,I4</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <strong>The ECLAT will have the format of the table as:</strong>
          </p>
          <div id="tablepress-933-scroll-wrapper" class="tablepress-scroll-wrapper">
            <table id="tablepress-933" class="table table-responsive table-hover">
              <thead>
                <tr class="row-1 odd">
                  <th class="column-1">Item</th>
                  <th class="column-2">Transaction Set</th>
                </tr>
              </thead>
              <tbody class="row-hover">
                <tr class="row-2 even">
                  <td class="column-1">I1</td>
                  <td class="column-2">{T1,T4,T5,T6}</td>
                </tr>
                <tr class="row-3 odd">
                  <td class="column-1">I2</td>
                  <td class="column-2">{T1,T2,T4,T5,T6}</td>
                </tr>
                <tr class="row-4 even">
                  <td class="column-1">I3</td>
                  <td class="column-2">{T1,T2,T5,T6}</td>
                </tr>
                <tr class="row-5 odd">
                  <td class="column-1">I4</td>
                  <td class="column-2">{T2,T3,T4,T5}</td>
                </tr>
                <tr class="row-6 even">
                  <td class="column-1">I5</td>
                  <td class="column-2">{T3,T5}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            This method will form 2-itemsets, 3 itemsets, k itemsets in the
            vertical data format. This process with k is increased by 1 until no
            candidate itemsets are found. Some optimizations techniques such as
            diffset are used along with Apriori.
          </p>
          <p>
            This method has an advantage over Apriori as it does not require
            scanning the database to find the support of k+1 itemsets. This is
            because the Transaction set will carry the count of occurrence of
            each item in the transaction (support). The bottleneck comes when
            there are many transactions taking huge memory and computational
            time for intersecting the sets.
          </p>
          <h3><span id="Conclusion">Conclusion</span></h3>
          <p>
            The Apriori algorithm is used for mining association rules. It works
            on the principle, “the non-empty subsets of frequent itemsets must
            also be frequent”. It forms k-itemset candidates from (k-1) itemsets
            and scans the database to find the frequent itemsets.
          </p>
          <p>
            Frequent Pattern Growth Algorithm is the method of finding frequent
            patterns without candidate generation. It constructs an FP Tree
            rather than using the generate and test strategy of Apriori. The
            focus of the FP Growth algorithm is on fragmenting the paths of the
            items and mining frequent patterns.
          </p>
          <p>
            <em><strong>We hope these tutorials in the Data Mining Series enriched your
                knowledge about Data Mining!!</strong></em>
          </p>
          <ScrollTop target="parent" class="p-scrolltop p-scrolltop-icon" label="Top" icon="pi pi-arrow-up" />
        </div>
      </article>
    </ScrollPanel>
  </div>
</template>

<script lang="ts">
import ScrollPanel from 'primevue/scrollpanel';
import ScrollTop from 'primevue/scrolltop';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    ScrollPanel,
    ScrollTop
  }
})
</script>