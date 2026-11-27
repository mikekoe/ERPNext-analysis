/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
var showControllersOnly = false;
var seriesFilter = '';
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
  var newRow = header.insertRow(-1);
  newRow.className = 'tablesorter-no-sort';
  var cell = document.createElement('th');
  cell.setAttribute('data-sorter', false);
  cell.colSpan = 1;
  cell.innerHTML = 'Requests';
  newRow.appendChild(cell);

  cell = document.createElement('th');
  cell.setAttribute('data-sorter', false);
  cell.colSpan = 3;
  cell.innerHTML = 'Executions';
  newRow.appendChild(cell);

  cell = document.createElement('th');
  cell.setAttribute('data-sorter', false);
  cell.colSpan = 7;
  cell.innerHTML = 'Response Times (ms)';
  newRow.appendChild(cell);

  cell = document.createElement('th');
  cell.setAttribute('data-sorter', false);
  cell.colSpan = 1;
  cell.innerHTML = 'Throughput';
  newRow.appendChild(cell);

  cell = document.createElement('th');
  cell.setAttribute('data-sorter', false);
  cell.colSpan = 2;
  cell.innerHTML = 'Network (KB/sec)';
  newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
  var tableRef = table[0];

  // Create header and populate it with data.titles array
  var header = tableRef.createTHead();

  // Call callback is available
  if (headerCreator) {
    headerCreator(header);
  }

  var newRow = header.insertRow(-1);
  for (var index = 0; index < info.titles.length; index++) {
    var cell = document.createElement('th');
    cell.innerHTML = info.titles[index];
    newRow.appendChild(cell);
  }

  var tBody;

  // Create overall body if defined
  if (info.overall) {
    tBody = document.createElement('tbody');
    tBody.className = 'tablesorter-no-sort';
    tableRef.appendChild(tBody);
    var newRow = tBody.insertRow(-1);
    var data = info.overall.data;
    for (var index = 0; index < data.length; index++) {
      var cell = newRow.insertCell(-1);
      cell.innerHTML = formatter ? formatter(index, data[index]) : data[index];
    }
  }

  // Create regular body
  tBody = document.createElement('tbody');
  tableRef.appendChild(tBody);

  var regexp;
  if (seriesFilter) {
    regexp = new RegExp(seriesFilter, 'i');
  }
  // Populate body with data.items array
  for (var index = 0; index < info.items.length; index++) {
    var item = info.items[index];
    if (
      (!regexp ||
        (filtersOnlySampleSeries && !info.supportsControllersDiscrimination) ||
        regexp.test(item.data[seriesIndex])) &&
      (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)
    ) {
      if (item.data.length > 0) {
        var newRow = tBody.insertRow(-1);
        for (var col = 0; col < item.data.length; col++) {
          var cell = newRow.insertCell(-1);
          cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
        }
      }
    }
  }

  // Add support of columns sort
  table.tablesorter({ sortList: defaultSorts });
}

$(document).ready(function () {
  // Customize table sorter default options
  $.extend($.tablesorter.defaults, {
    theme: 'blue',
    cssInfoBlock: 'tablesorter-no-sort',
    widthFixed: true,
    widgets: ['zebra'],
  });

  var data = { OkPercent: 99.98107950049881, KoPercent: 0.018920499501186832 };
  var dataset = [
    {
      label: 'FAIL',
      data: data.KoPercent,
      color: '#FF6347',
    },
    {
      label: 'PASS',
      data: data.OkPercent,
      color: '#9ACD32',
    },
  ];
  $.plot($('#flot-requests-summary'), dataset, {
    series: {
      pie: {
        show: true,
        radius: 1,
        label: {
          show: true,
          radius: 3 / 4,
          formatter: function (label, series) {
            return (
              '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' +
              label +
              '<br/>' +
              Math.round10(series.percent, -2) +
              '%</div>'
            );
          },
          background: {
            opacity: 0.5,
            color: '#000',
          },
        },
      },
    },
    legend: {
      show: true,
    },
  });

  // Creates APDEX table
  createTable(
    $('#apdexTable'),
    {
      supportsControllersDiscrimination: true,
      overall: { data: [0.86068062196842, 500, 1500, 'Total'], isController: false },
      titles: ['Apdex', 'T (Toleration threshold)', 'F (Frustration threshold)', 'Label'],
      items: [
        { data: [0.8643557543437124, 500, 1500, 'GET Inventory'], isController: false },
        { data: [0.8681042784427019, 500, 1500, 'GET Warehouses'], isController: false },
        { data: [0.8710498263470995, 500, 1500, 'GET items'], isController: false },
        { data: [0.8391959798994975, 500, 1500, 'GET Work Order'], isController: false },
      ],
    },
    function (index, item) {
      switch (index) {
        case 0:
          item = item.toFixed(3);
          break;
        case 1:
        case 2:
          item = formatDuration(item);
          break;
      }
      return item;
    },
    [[0, 0]],
    3,
  );

  // Create statistics table
  createTable(
    $('#statisticsTable'),
    {
      supportsControllersDiscrimination: true,
      overall: {
        data: [
          'Total',
          116276,
          22,
          0.018920499501186832,
          457.6637827238667,
          66,
          2703,
          426.0,
          565.0,
          620.0,
          749.9900000000016,
          64.59146216814355,
          128.1516997548087,
          18.749385259760714,
        ],
        isController: false,
      },
      titles: [
        'Label',
        '#Samples',
        'FAIL',
        'Error %',
        'Average',
        'Min',
        'Max',
        'Median',
        '90th pct',
        '95th pct',
        '99th pct',
        'Transactions/s',
        'Received',
        'Sent',
      ],
      items: [
        {
          data: [
            'GET Inventory',
            29065,
            6,
            0.020643385515224495,
            456.8025460175461,
            68,
            2703,
            428.0,
            572.0,
            632.0,
            758.9900000000016,
            16.147581057356827,
            46.93492917464138,
            5.866113430992911,
          ],
          isController: false,
        },
        {
          data: [
            'GET Warehouses',
            29076,
            4,
            0.013757050488375293,
            452.9387123400734,
            66,
            2225,
            427.0,
            567.9000000000015,
            622.0,
            749.0,
            16.152956431016612,
            13.585170208875683,
            4.211757194415464,
          ],
          isController: false,
        },
        {
          data: [
            'GET items',
            29081,
            6,
            0.020632027784464085,
            453.2728241807357,
            69,
            2601,
            427.0,
            567.0,
            625.0,
            743.0,
            16.15466616597071,
            11.990422748993007,
            4.133322788558912,
          ],
          isController: false,
        },
        {
          data: [
            'GET Work Order',
            29054,
            6,
            0.02065120121153714,
            467.64903283540923,
            72,
            1561,
            449.0,
            594.0,
            651.0,
            769.0,
            16.142348691177435,
            55.65762863000052,
            4.540035569393654,
          ],
          isController: false,
        },
      ],
    },
    function (index, item) {
      switch (index) {
        // Errors pct
        case 3:
          item = item.toFixed(2) + '%';
          break;
        // Mean
        case 4:
        // Mean
        case 7:
        // Median
        case 8:
        // Percentile 1
        case 9:
        // Percentile 2
        case 10:
        // Percentile 3
        case 11:
        // Throughput
        case 12:
        // Kbytes/s
        case 13:
          // Sent Kbytes/s
          item = item.toFixed(2);
          break;
      }
      return item;
    },
    [[0, 0]],
    0,
    summaryTableHeader,
  );

  // Create error table
  createTable(
    $('#errorsTable'),
    {
      supportsControllersDiscrimination: false,
      titles: ['Type of error', 'Number of errors', '% in errors', '% in all samples'],
      items: [
        {
          data: ['401/UNAUTHORIZED', 12, 54.54545454545455, 0.010320272455192818],
          isController: false,
        },
        {
          data: ['500/INTERNAL SERVER ERROR', 10, 45.45454545454545, 0.008600227045994014],
          isController: false,
        },
      ],
    },
    function (index, item) {
      switch (index) {
        case 2:
        case 3:
          item = item.toFixed(2) + '%';
          break;
      }
      return item;
    },
    [[1, 1]],
  );

  // Create top5 errors by sampler
  createTable(
    $('#top5ErrorsBySamplerTable'),
    {
      supportsControllersDiscrimination: false,
      overall: {
        data: [
          'Total',
          116276,
          22,
          '401/UNAUTHORIZED',
          12,
          '500/INTERNAL SERVER ERROR',
          10,
          '',
          '',
          '',
          '',
          '',
          '',
        ],
        isController: false,
      },
      titles: [
        'Sample',
        '#Samples',
        '#Errors',
        'Error',
        '#Errors',
        'Error',
        '#Errors',
        'Error',
        '#Errors',
        'Error',
        '#Errors',
        'Error',
        '#Errors',
      ],
      items: [
        {
          data: [
            'GET Inventory',
            29065,
            6,
            '500/INTERNAL SERVER ERROR',
            4,
            '401/UNAUTHORIZED',
            2,
            '',
            '',
            '',
            '',
            '',
            '',
          ],
          isController: false,
        },
        {
          data: [
            'GET Warehouses',
            29076,
            4,
            '401/UNAUTHORIZED',
            3,
            '500/INTERNAL SERVER ERROR',
            1,
            '',
            '',
            '',
            '',
            '',
            '',
          ],
          isController: false,
        },
        {
          data: [
            'GET items',
            29081,
            6,
            '401/UNAUTHORIZED',
            3,
            '500/INTERNAL SERVER ERROR',
            3,
            '',
            '',
            '',
            '',
            '',
            '',
          ],
          isController: false,
        },
        {
          data: [
            'GET Work Order',
            29054,
            6,
            '401/UNAUTHORIZED',
            4,
            '500/INTERNAL SERVER ERROR',
            2,
            '',
            '',
            '',
            '',
            '',
            '',
          ],
          isController: false,
        },
      ],
    },
    function (index, item) {
      return item;
    },
    [[0, 0]],
    0,
  );
});
