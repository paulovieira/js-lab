var chroma = require("chroma-js");
var fs = require("fs");

var colorBrew = {
    "BuGn": {
        "2": [
        chroma(229   ,  245   ,  249).hex(),
        chroma(153   ,  216   ,  201).hex()],

        "3": [
        chroma(229   ,  245   ,  249).hex(),
        chroma(153   ,  216   ,  201).hex(),
        chroma(44    ,  162   ,  95).hex()],

        "4": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(178   ,  226   ,  226).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(35    ,  139   ,  69).hex()],

        "5": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(178   ,  226   ,  226).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(44    ,  162   ,  95).hex(),
        chroma(0     ,  109   ,  44).hex()],

        "6": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(204   ,  236   ,  230).hex(),
        chroma(153   ,  216   ,  201).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(44    ,  162   ,  95).hex(),
        chroma(0     ,  109   ,  44).hex()],

        "7": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(204   ,  236   ,  230).hex(),
        chroma(153   ,  216   ,  201).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(65    ,  174   ,  118).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  88    ,  36).hex()],

        "8": [
        chroma(247   ,  252   ,  253).hex(),
        chroma(229   ,  245   ,  249).hex(),
        chroma(204   ,  236   ,  230).hex(),
        chroma(153   ,  216   ,  201).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(65    ,  174   ,  118).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  88    ,  36).hex()],

        "9": [
        chroma(247   ,  252   ,  253).hex(),
        chroma(229   ,  245   ,  249).hex(),
        chroma(204   ,  236   ,  230).hex(),
        chroma(153   ,  216   ,  201).hex(),
        chroma(102   ,  194   ,  164).hex(),
        chroma(65    ,  174   ,  118).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  109   ,  44).hex(),
        chroma(0     ,  68    ,  27).hex()],

    },

    "BuPu": {
        "2": [
        chroma(224   ,  236   ,  244).hex(),
        chroma(158   ,  188   ,  218).hex()],

        "3": [
        chroma(224   ,  236   ,  244).hex(),
        chroma(158   ,  188   ,  218).hex(),
        chroma(136   ,  86    ,  167).hex()],

        "4": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(179   ,  205   ,  227).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(136   ,  65    ,  157).hex()],

        "5": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(179   ,  205   ,  227).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(136   ,  86    ,  167).hex(),
        chroma(129   ,  15    ,  124).hex()],

        "6": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(191   ,  211   ,  230).hex(),
        chroma(158   ,  188   ,  218).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(136   ,  86    ,  167).hex(),
        chroma(129   ,  15    ,  124).hex()],

        "7": [
        chroma(237   ,  248   ,  251).hex(),
        chroma(191   ,  211   ,  230).hex(),
        chroma(158   ,  188   ,  218).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(140   ,  107   ,  177).hex(),
        chroma(136   ,  65    ,  157).hex(),
        chroma(110   ,  1     ,  107).hex()],

        "8": [
        chroma(247   ,  252   ,  253).hex(),
        chroma(224   ,  236   ,  244).hex(),
        chroma(191   ,  211   ,  230).hex(),
        chroma(158   ,  188   ,  218).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(140   ,  107   ,  177).hex(),
        chroma(136   ,  65    ,  157).hex(),
        chroma(110   ,  1     ,  107).hex()],

        "9": [
        chroma(247   ,  252   ,  253).hex(),
        chroma(224   ,  236   ,  244).hex(),
        chroma(191   ,  211   ,  230).hex(),
        chroma(158   ,  188   ,  218).hex(),
        chroma(140   ,  150   ,  198).hex(),
        chroma(140   ,  107   ,  177).hex(),
        chroma(136   ,  65    ,  157).hex(),
        chroma(129   ,  15    ,  124).hex(),
        chroma(77    ,  0     ,  75).hex()],

    },

    "GnBu": {
        "2": [
        chroma(224   ,  243  ,   219).hex(),
        chroma(168   ,  221  ,   181).hex()],

        "3": [
        chroma(224   ,  243  ,   219).hex(),
        chroma(168   ,  221  ,   181).hex(),
        chroma(67    ,  162  ,   202).hex()],

        "4": [
        chroma(240   ,  249  ,   232).hex(),
        chroma(186   ,  228  ,   188).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(43    ,  140  ,   190).hex()],

        "5": [
        chroma(240   ,  249  ,   232).hex(),
        chroma(186   ,  228  ,   188).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(67    ,  162  ,   202).hex(),
        chroma(8     ,  104  ,   172).hex()],

        "6": [
        chroma(240   ,  249  ,   232).hex(),
        chroma(204   ,  235  ,   197).hex(),
        chroma(168   ,  221  ,   181).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(67    ,  162  ,   202).hex(),
        chroma(8     ,  104  ,   172).hex()],

        "7": [
        chroma(240   ,  249  ,   232).hex(),
        chroma(204   ,  235  ,   197).hex(),
        chroma(168   ,  221  ,   181).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(78    ,  179  ,   211).hex(),
        chroma(43    ,  140  ,   190).hex(),
        chroma(8     ,  88   ,   158).hex()],

        "8": [
        chroma(247   ,  252  ,   240).hex(),
        chroma(224   ,  243  ,   219).hex(),
        chroma(204   ,  235  ,   197).hex(),
        chroma(168   ,  221  ,   181).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(78    ,  179  ,   211).hex(),
        chroma(43    ,  140  ,   190).hex(),
        chroma(8     ,  88   ,   158).hex()],

        "9": [
        chroma(247   ,  252  ,   240).hex(),
        chroma(224   ,  243  ,   219).hex(),
        chroma(204   ,  235  ,   197).hex(),
        chroma(168   ,  221  ,   181).hex(),
        chroma(123   ,  204  ,   196).hex(),
        chroma(78    ,  179  ,   211).hex(),
        chroma(43    ,  140  ,   190).hex(),
        chroma(8     ,  104  ,   172).hex(),
        chroma(8     ,  64   ,   129).hex()]
    },

    "OrRd": {
        "2": [
        chroma(254  ,   232  ,   200).hex(),
        chroma(253  ,   187  ,   132).hex()],

        "3": [
        chroma(254  ,   232  ,   200).hex(),
        chroma(253  ,   187  ,   132).hex(),
        chroma(227  ,   74   ,   51).hex()],

        "4": [
        chroma(254  ,   240  ,   217).hex(),
        chroma(253  ,   204  ,   138).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(215  ,   48   ,   31).hex()],

        "5": [
        chroma(254  ,   240  ,   217).hex(),
        chroma(253  ,   204  ,   138).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(227  ,   74   ,   51).hex(),
        chroma(179  ,   0    ,   0).hex()],

        "6": [
        chroma(254  ,   240  ,   217).hex(),
        chroma(253  ,   212  ,   158).hex(),
        chroma(253  ,   187  ,   132).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(227  ,   74   ,   51).hex(),
        chroma(179  ,   0    ,   0).hex()],

        "7": [
        chroma(254  ,   240  ,   217).hex(),
        chroma(253  ,   212  ,   158).hex(),
        chroma(253  ,   187  ,   132).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(239  ,   101  ,   72).hex(),
        chroma(215  ,   48   ,   31).hex(),
        chroma(153  ,   0    ,   0).hex()],

        "8": [
        chroma(255  ,   247  ,   236).hex(),
        chroma(254  ,   232  ,   200).hex(),
        chroma(253  ,   212  ,   158).hex(),
        chroma(253  ,   187  ,   132).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(239  ,   101  ,   72).hex(),
        chroma(215  ,   48   ,   31).hex(),
        chroma(153  ,   0    ,   0).hex()],

        "9": [
        chroma(255  ,   247  ,   236).hex(),
        chroma(254  ,   232  ,   200).hex(),
        chroma(253  ,   212  ,   158).hex(),
        chroma(253  ,   187  ,   132).hex(),
        chroma(252  ,   141  ,   89).hex(),
        chroma(239  ,   101  ,   72).hex(),
        chroma(215  ,   48   ,   31).hex(),
        chroma(179  ,   0    ,   0).hex(),
        chroma(127  ,   0    ,   0).hex()],

    },

    "PuBu": {
        "2": [
        chroma(236  ,   231  ,   242).hex(),
        chroma(166  ,   189  ,   219).hex()],

        "3": [
        chroma(236  ,   231  ,   242).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(43   ,   140  ,   190).hex()],

        "4": [
        chroma(241  ,   238  ,   246).hex(),
        chroma(189  ,   201  ,   225).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(5    ,   112  ,   176).hex()],

        "5": [
        chroma(241  ,   238  ,   246).hex(),
        chroma(189  ,   201  ,   225).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(43   ,   140  ,   190).hex(),
        chroma(4    ,   90   ,   141).hex()],

        "6": [
        chroma(241  ,   238  ,   246).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(43   ,   140  ,   190).hex(),
        chroma(4    ,   90   ,   141).hex()],

        "7": [
        chroma(241  ,   238  ,   246).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(5    ,   112  ,   176).hex(),
        chroma(3    ,   78   ,   123).hex()],

        "8": [
        chroma(255  ,   247  ,   251).hex(),
        chroma(236  ,   231  ,   242).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(5    ,   112  ,   176).hex(),
        chroma(3    ,   78   ,   123).hex()],

        "9": [
        chroma(255  ,   247  ,   251).hex(),
        chroma(236  ,   231  ,   242).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(116  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(5    ,   112  ,   176).hex(),
        chroma(4    ,   90   ,   141).hex(),
        chroma(2    ,   56   ,   88).hex()],

    },

    "PuBuGn": {
        "2": [
        chroma(236  ,   226  ,   240).hex(),
        chroma(166  ,   189  ,   219).hex()],

        "3": [
        chroma(236  ,   226  ,   240).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(28   ,   144  ,   153).hex()],

        "4": [
        chroma(246  ,   239  ,   247).hex(),
        chroma(189  ,   201  ,   225).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(2    ,   129  ,   138).hex()],

        "5": [
        chroma(246  ,   239  ,   247).hex(),
        chroma(189  ,   201  ,   225).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(28   ,   144  ,   153).hex(),
        chroma(1    ,   108  ,   89).hex()],

        "6": [
        chroma(246  ,   239  ,   247).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(28   ,   144  ,   153).hex(),
        chroma(1    ,   108  ,   89).hex()],

        "7": [
        chroma(246  ,   239  ,   247).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(2    ,   129  ,   138).hex(),
        chroma(1    ,   100  ,   80).hex()],

        "8": [
        chroma(255  ,   247  ,   251).hex(),
        chroma(236  ,   226  ,   240).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(2    ,   129  ,   138).hex(),
        chroma(1    ,   100  ,   80).hex()],

        "9": [
        chroma(255  ,   247  ,   251).hex(),
        chroma(236  ,   226  ,   240).hex(),
        chroma(208  ,   209  ,   230).hex(),
        chroma(166  ,   189  ,   219).hex(),
        chroma(103  ,   169  ,   207).hex(),
        chroma(54   ,   144  ,   192).hex(),
        chroma(2    ,   129  ,   138).hex(),
        chroma(1    ,   108  ,   89).hex(),
        chroma(1    ,   70   ,   54).hex()],

    },

    "PuRd": {
        "2": [
        chroma(231  ,   225 ,    239).hex(),
        chroma(201  ,   148 ,    199).hex()],

        "3": [
        chroma(231  ,   225 ,    239).hex(),
        chroma(201  ,   148 ,    199).hex(),
        chroma(221  ,   28  ,    119).hex()],

        "4": [
        chroma(241  ,   238 ,    246).hex(),
        chroma(215  ,   181 ,    216).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(206  ,   18  ,    86).hex()],

        "5": [
        chroma(241  ,   238 ,    246).hex(),
        chroma(215  ,   181 ,    216).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(221  ,   28  ,    119).hex(),
        chroma(152  ,   0   ,    67).hex()],

        "6": [
        chroma(241  ,   238 ,    246).hex(),
        chroma(212  ,   185 ,    218).hex(),
        chroma(201  ,   148 ,    199).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(221  ,   28  ,    119).hex(),
        chroma(152  ,   0   ,    67).hex()],

        "7": [
        chroma(241  ,   238 ,    246).hex(),
        chroma(212  ,   185 ,    218).hex(),
        chroma(201  ,   148 ,    199).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(231  ,   41  ,    138).hex(),
        chroma(206  ,   18  ,    86).hex(),
        chroma(145  ,   0   ,    63).hex()],

        "8": [
        chroma(247  ,   244 ,    249).hex(),
        chroma(231  ,   225 ,    239).hex(),
        chroma(212  ,   185 ,    218).hex(),
        chroma(201  ,   148 ,    199).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(231  ,   41  ,    138).hex(),
        chroma(206  ,   18  ,    86).hex(),
        chroma(145  ,   0   ,    63).hex()],

        "9": [
        chroma(247  ,   244 ,    249).hex(),
        chroma(231  ,   225 ,    239).hex(),
        chroma(212  ,   185 ,    218).hex(),
        chroma(201  ,   148 ,    199).hex(),
        chroma(223  ,   101 ,    176).hex(),
        chroma(231  ,   41  ,    138).hex(),
        chroma(206  ,   18  ,    86).hex(),
        chroma(152  ,   0   ,    67).hex(),
        chroma(103  ,   0   ,    31).hex()],

    },

    "RdPu": {
        "2": [
        chroma(253   ,  224   ,  221).hex(),
        chroma(250   ,  159   ,  181).hex()],

        "3": [
        chroma(253   ,  224   ,  221).hex(),
        chroma(250   ,  159   ,  181).hex(),
        chroma(197   ,  27    ,  138).hex()],

        "4": [
        chroma(254   ,  235   ,  226).hex(),
        chroma(251   ,  180   ,  185).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(174   ,  1     ,  126).hex()],

        "5": [
        chroma(254   ,  235   ,  226).hex(),
        chroma(251   ,  180   ,  185).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(197   ,  27    ,  138).hex(),
        chroma(122   ,  1     ,  119).hex()],

        "6": [
        chroma(254   ,  235   ,  226).hex(),
        chroma(252   ,  197   ,  192).hex(),
        chroma(250   ,  159   ,  181).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(197   ,  27    ,  138).hex(),
        chroma(122   ,  1     ,  119).hex()],

        "7": [
        chroma(254   ,  235   ,  226).hex(),
        chroma(252   ,  197   ,  192).hex(),
        chroma(250   ,  159   ,  181).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(221   ,  52    ,  151).hex(),
        chroma(174   ,  1     ,  126).hex(),
        chroma(122   ,  1     ,  119).hex()],

        "8": [
        chroma(255   ,  247   ,  243).hex(),
        chroma(253   ,  224   ,  221).hex(),
        chroma(252   ,  197   ,  192).hex(),
        chroma(250   ,  159   ,  181).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(221   ,  52    ,  151).hex(),
        chroma(174   ,  1     ,  126).hex(),
        chroma(122   ,  1     ,  119).hex()],

        "9": [
        chroma(255   ,  247   ,  243).hex(),
        chroma(253   ,  224   ,  221).hex(),
        chroma(252   ,  197   ,  192).hex(),
        chroma(250   ,  159   ,  181).hex(),
        chroma(247   ,  104   ,  161).hex(),
        chroma(221   ,  52    ,  151).hex(),
        chroma(174   ,  1     ,  126).hex(),
        chroma(122   ,  1     ,  119).hex(),
        chroma(73    ,  0     ,  106).hex()],

    },

    "YlGn": {
        "2": [
        chroma(247   ,  252   ,  185).hex(),
        chroma(173   ,  221   ,  142).hex()],

        "3": [
        chroma(247   ,  252   ,  185).hex(),
        chroma(173   ,  221   ,  142).hex(),
        chroma(49    ,  163   ,  84).hex()],

        "4": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(194   ,  230   ,  153).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(35    ,  132   ,  67).hex()],

        "5": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(194   ,  230   ,  153).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(49    ,  163   ,  84).hex(),
        chroma(0     ,  104   ,  55).hex()],

        "6": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(217   ,  240   ,  163).hex(),
        chroma(173   ,  221   ,  142).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(49    ,  163   ,  84).hex(),
        chroma(0     ,  104   ,  55).hex()],

        "7": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(217   ,  240   ,  163).hex(),
        chroma(173   ,  221   ,  142).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  132   ,  67).hex(),
        chroma(0     ,  90    ,  50).hex()],

        "8": [
        chroma(255   ,  255   ,  229).hex(),
        chroma(247   ,  252   ,  185).hex(),
        chroma(217   ,  240   ,  163).hex(),
        chroma(173   ,  221   ,  142).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  132   ,  67).hex(),
        chroma(0     ,  90    ,  50).hex()],

        "9": [
        chroma(255   ,  255   ,  229).hex(),
        chroma(247   ,  252   ,  185).hex(),
        chroma(217   ,  240   ,  163).hex(),
        chroma(173   ,  221   ,  142).hex(),
        chroma(120   ,  198   ,  121).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  132   ,  67).hex(),
        chroma(0     ,  104   ,  55).hex(),
        chroma(0     ,  69    ,  41).hex()],

    },

    "YlGnBu": {
        "2": [
        chroma(237   ,  248  ,   177).hex(),
        chroma(127   ,  205  ,   187).hex()],

        "3": [
        chroma(237   ,  248  ,   177).hex(),
        chroma(127   ,  205  ,   187).hex(),
        chroma(44    ,  127  ,   184).hex()],

        "4": [
        chroma(255   ,  255  ,   204).hex(),
        chroma(161   ,  218  ,   180).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(34    ,  94   ,   168).hex()],

        "5": [
        chroma(255   ,  255  ,   204).hex(),
        chroma(161   ,  218  ,   180).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(44    ,  127  ,   184).hex(),
        chroma(37    ,  52   ,   148).hex()],

        "6": [
        chroma(255   ,  255  ,   204).hex(),
        chroma(199   ,  233  ,   180).hex(),
        chroma(127   ,  205  ,   187).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(44    ,  127  ,   184).hex(),
        chroma(37    ,  52   ,   148).hex()],

        "7": [
        chroma(255   ,  255  ,   204).hex(),
        chroma(199   ,  233  ,   180).hex(),
        chroma(127   ,  205  ,   187).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(29    ,  145  ,   192).hex(),
        chroma(34    ,  94   ,   168).hex(),
        chroma(12    ,  44   ,   132).hex()],

        "8": [
        chroma(255   ,  255  ,   217).hex(),
        chroma(237   ,  248  ,   177).hex(),
        chroma(199   ,  233  ,   180).hex(),
        chroma(127   ,  205  ,   187).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(29    ,  145  ,   192).hex(),
        chroma(34    ,  94   ,   168).hex(),
        chroma(12    ,  44   ,   132).hex()],

        "9": [
        chroma(255   ,  255  ,   217).hex(),
        chroma(237   ,  248  ,   177).hex(),
        chroma(199   ,  233  ,   180).hex(),
        chroma(127   ,  205  ,   187).hex(),
        chroma(65    ,  182  ,   196).hex(),
        chroma(29    ,  145  ,   192).hex(),
        chroma(34    ,  94   ,   168).hex(),
        chroma(37    ,  52   ,   148).hex(),
        chroma(8     ,  29   ,   88).hex()],

    },

    "YlOrBr": {
        "2": [
        chroma(255   ,  247  ,   188).hex(),
        chroma(254   ,  196  ,   79).hex()],

        "3": [
        chroma(255   ,  247  ,   188).hex(),
        chroma(254   ,  196  ,   79).hex(),
        chroma(217   ,  95   ,   14).hex()],

        "4": [
        chroma(255   ,  255  ,   212).hex(),
        chroma(254   ,  217  ,   142).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(204   ,  76   ,   2).hex()],

        "5": [
        chroma(255   ,  255  ,   212).hex(),
        chroma(254   ,  217  ,   142).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(217   ,  95   ,   14).hex(),
        chroma(153   ,  52   ,   4).hex()],

        "6": [
        chroma(255   ,  255  ,   212).hex(),
        chroma(254   ,  227  ,   145).hex(),
        chroma(254   ,  196  ,   79).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(217   ,  95   ,   14).hex(),
        chroma(153   ,  52   ,   4).hex()],

        "7": [
        chroma(255   ,  255  ,   212).hex(),
        chroma(254   ,  227  ,   145).hex(),
        chroma(254   ,  196  ,   79).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(236   ,  112  ,   20).hex(),
        chroma(204   ,  76   ,   2).hex(),
        chroma(140   ,  45   ,   4).hex()],

        "8": [
        chroma(255   ,  255  ,   229).hex(),
        chroma(255   ,  247  ,   188).hex(),
        chroma(254   ,  227  ,   145).hex(),
        chroma(254   ,  196  ,   79).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(236   ,  112  ,   20).hex(),
        chroma(204   ,  76   ,   2).hex(),
        chroma(140   ,  45   ,   4).hex()],

        "9": [
        chroma(255   ,  255  ,   229).hex(),
        chroma(255   ,  247  ,   188).hex(),
        chroma(254   ,  227  ,   145).hex(),
        chroma(254   ,  196  ,   79).hex(),
        chroma(254   ,  153  ,   41).hex(),
        chroma(236   ,  112  ,   20).hex(),
        chroma(204   ,  76   ,   2).hex(),
        chroma(153   ,  52   ,   4).hex(),
        chroma(102   ,  37   ,   6).hex()],

    },

    "YlOrRd": {
        "2": [
        chroma(255   ,  237   ,  160).hex(),
        chroma(254   ,  178   ,  76).hex()],

        "3": [
        chroma(255   ,  237   ,  160).hex(),
        chroma(254   ,  178   ,  76).hex(),
        chroma(240   ,  59    ,  32).hex()],

        "4": [
        chroma(255   ,  255   ,  178).hex(),
        chroma(254   ,  204   ,  92).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(227   ,  26    ,  28).hex()],

        "5": [
        chroma(255   ,  255   ,  178).hex(),
        chroma(254   ,  204   ,  92).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(240   ,  59    ,  32).hex(),
        chroma(189   ,  0     ,  38).hex()],

        "6": [
        chroma(255   ,  255   ,  178).hex(),
        chroma(254   ,  217   ,  118).hex(),
        chroma(254   ,  178   ,  76).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(240   ,  59    ,  32).hex(),
        chroma(189   ,  0     ,  38).hex()],

        "7": [
        chroma(255   ,  255   ,  178).hex(),
        chroma(254   ,  217   ,  118).hex(),
        chroma(254   ,  178   ,  76).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(252   ,  78    ,  42).hex(),
        chroma(227   ,  26    ,  28).hex(),
        chroma(177   ,  0     ,  38).hex()],

        "8": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(255   ,  237   ,  160).hex(),
        chroma(254   ,  217   ,  118).hex(),
        chroma(254   ,  178   ,  76).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(252   ,  78    ,  42).hex(),
        chroma(227   ,  26    ,  28).hex(),
        chroma(177   ,  0     ,  38).hex()],

        "9": [
        chroma(255   ,  255   ,  204).hex(),
        chroma(255   ,  237   ,  160).hex(),
        chroma(254   ,  217   ,  118).hex(),
        chroma(254   ,  178   ,  76).hex(),
        chroma(253   ,  141   ,  60).hex(),
        chroma(252   ,  78    ,  42).hex(),
        chroma(227   ,  26    ,  28).hex(),
        chroma(189   ,  0     ,  38).hex(),
        chroma(128   ,  0     ,  38).hex()],

    },

    "Blues": {
        "2": [
        chroma(222    , 235   ,  247).hex(),
        chroma(158    , 202   ,  225).hex()],

        "3": [
        chroma(222    , 235   ,  247).hex(),
        chroma(158    , 202   ,  225).hex(),
        chroma(49     , 130   ,  189).hex()],

        "4": [
        chroma(239    , 243   ,  255).hex(),
        chroma(189    , 215   ,  231).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(33     , 113   ,  181).hex()],

        "5": [
        chroma(239    , 243   ,  255).hex(),
        chroma(189    , 215   ,  231).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(49     , 130   ,  189).hex(),
        chroma(8      , 81    ,  156).hex()],

        "6": [
        chroma(239    , 243   ,  255).hex(),
        chroma(198    , 219   ,  239).hex(),
        chroma(158    , 202   ,  225).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(49     , 130   ,  189).hex(),
        chroma(8      , 81    ,  156).hex()],

        "7": [
        chroma(239    , 243   ,  255).hex(),
        chroma(198    , 219   ,  239).hex(),
        chroma(158    , 202   ,  225).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(66     , 146   ,  198).hex(),
        chroma(33     , 113   ,  181).hex(),
        chroma(8      , 69    ,  148).hex()],

        "8": [
        chroma(247    , 251   ,  255).hex(),
        chroma(222    , 235   ,  247).hex(),
        chroma(198    , 219   ,  239).hex(),
        chroma(158    , 202   ,  225).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(66     , 146   ,  198).hex(),
        chroma(33     , 113   ,  181).hex(),
        chroma(8      , 69    ,  148).hex()],

        "9": [
        chroma(247    , 251   ,  255).hex(),
        chroma(222    , 235   ,  247).hex(),
        chroma(198    , 219   ,  239).hex(),
        chroma(158    , 202   ,  225).hex(),
        chroma(107    , 174   ,  214).hex(),
        chroma(66     , 146   ,  198).hex(),
        chroma(33     , 113   ,  181).hex(),
        chroma(8      , 81    ,  156).hex(),
        chroma(8      , 48    ,  107).hex()],

    },

    "Greens": {
        "2": [
        chroma(229   ,  245   ,  224).hex(),
        chroma(161   ,  217   ,  155).hex()],

        "3": [
        chroma(229   ,  245   ,  224).hex(),
        chroma(161   ,  217   ,  155).hex(),
        chroma(49    ,  163   ,  84).hex()],

        "4": [
        chroma(237   ,  248   ,  233).hex(),
        chroma(186   ,  228   ,  179).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(35    ,  139   ,  69).hex()],

        "5": [
        chroma(237   ,  248   ,  233).hex(),
        chroma(186   ,  228   ,  179).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(49    ,  163   ,  84).hex(),
        chroma(0     ,  109   ,  44).hex()],

        "6": [
        chroma(237   ,  248   ,  233).hex(),
        chroma(199   ,  233   ,  192).hex(),
        chroma(161   ,  217   ,  155).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(49    ,  163   ,  84).hex(),
        chroma(0     ,  109   ,  44).hex()],

        "7": [
        chroma(237   ,  248   ,  233).hex(),
        chroma(199   ,  233   ,  192).hex(),
        chroma(161   ,  217   ,  155).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  90    ,  50).hex()],

        "8": [
        chroma(247   ,  252   ,  245).hex(),
        chroma(229   ,  245   ,  224).hex(),
        chroma(199   ,  233   ,  192).hex(),
        chroma(161   ,  217   ,  155).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  90    ,  50).hex()],

        "9": [
        chroma(247   ,  252   ,  245).hex(),
        chroma(229   ,  245   ,  224).hex(),
        chroma(199   ,  233   ,  192).hex(),
        chroma(161   ,  217   ,  155).hex(),
        chroma(116   ,  196   ,  118).hex(),
        chroma(65    ,  171   ,  93).hex(),
        chroma(35    ,  139   ,  69).hex(),
        chroma(0     ,  109   ,  44).hex(),
        chroma(0     ,  68    ,  27).hex()],

    },

    "Greys": {
        "2": [
        chroma(240    , 240   ,  240).hex(),
        chroma(189    , 189   ,  189).hex()],

        "3": [
        chroma(240    , 240   ,  240).hex(),
        chroma(189    , 189   ,  189).hex(),
        chroma(99     , 99    ,  99).hex()],

        "4": [
        chroma(247    , 247   ,  247).hex(),
        chroma(204    , 204   ,  204).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(82     , 82    ,  82).hex()],

        "5": [
        chroma(247    , 247   ,  247).hex(),
        chroma(204    , 204   ,  204).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(99     , 99    ,  99).hex(),
        chroma(37     , 37    ,  37).hex()],

        "6": [
        chroma(247    , 247   ,  247).hex(),
        chroma(217    , 217   ,  217).hex(),
        chroma(189    , 189   ,  189).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(99     , 99    ,  99).hex(),
        chroma(37     , 37    ,  37).hex()],

        "7": [
        chroma(247    , 247   ,  247).hex(),
        chroma(217    , 217   ,  217).hex(),
        chroma(189    , 189   ,  189).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(115    , 115   ,  115).hex(),
        chroma(82     , 82    ,  82).hex(),
        chroma(37     , 37    ,  37).hex()],

        "8": [
        chroma(255    , 255   ,  255).hex(),
        chroma(240    , 240   ,  240).hex(),
        chroma(217    , 217   ,  217).hex(),
        chroma(189    , 189   ,  189).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(115    , 115   ,  115).hex(),
        chroma(82     , 82    ,  82).hex(),
        chroma(37     , 37    ,  37).hex()],

        "9": [
        chroma(255    , 255   ,  255).hex(),
        chroma(240    , 240   ,  240).hex(),
        chroma(217    , 217   ,  217).hex(),
        chroma(189    , 189   ,  189).hex(),
        chroma(150    , 150   ,  150).hex(),
        chroma(115    , 115   ,  115).hex(),
        chroma(82     , 82    ,  82).hex(),
        chroma(37     , 37    ,  37).hex(),
        chroma(0      , 0     ,  0).hex()],

    },

    "Oranges": {
        "2": [
        chroma(254    , 230   ,  206).hex(),
        chroma(253    , 174   ,  107).hex()],

        "3": [
        chroma(254    , 230   ,  206).hex(),
        chroma(253    , 174   ,  107).hex(),
        chroma(230    , 85    ,  13).hex()],

        "4": [
        chroma(254    , 237   ,  222).hex(),
        chroma(253    , 190   ,  133).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(217    , 71    ,  1).hex()],

        "5": [
        chroma(254    , 237   ,  222).hex(),
        chroma(253    , 190   ,  133).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(230    , 85    ,  13).hex(),
        chroma(166    , 54    ,  3).hex()],

        "6": [
        chroma(254    , 237   ,  222).hex(),
        chroma(253    , 208   ,  162).hex(),
        chroma(253    , 174   ,  107).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(230    , 85    ,  13).hex(),
        chroma(166    , 54    ,  3).hex()],

        "7": [
        chroma(254    , 237   ,  222).hex(),
        chroma(253    , 208   ,  162).hex(),
        chroma(253    , 174   ,  107).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(241    , 105   ,  19).hex(),
        chroma(217    , 72    ,  1).hex(),
        chroma(140    , 45    ,  4).hex()],

        "8": [
        chroma(255    , 245   ,  235).hex(),
        chroma(254    , 230   ,  206).hex(),
        chroma(253    , 208   ,  162).hex(),
        chroma(253    , 174   ,  107).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(241    , 105   ,  19).hex(),
        chroma(217    , 72    ,  1).hex(),
        chroma(140    , 45    ,  4).hex()],

        "9": [
        chroma(255    , 245   ,  235).hex(),
        chroma(254    , 230   ,  206).hex(),
        chroma(253    , 208   ,  162).hex(),
        chroma(253    , 174   ,  107).hex(),
        chroma(253    , 141   ,  60).hex(),
        chroma(241    , 105   ,  19).hex(),
        chroma(217    , 72    ,  1).hex(),
        chroma(166    , 54    ,  3).hex(),
        chroma(127    , 39    ,  4).hex()],

    },

    "Purples": {
        "2": [
        chroma(239    , 237   ,  245).hex(),
        chroma(188    , 189   ,  220).hex()],

        "3": [
        chroma(239    , 237   ,  245).hex(),
        chroma(188    , 189   ,  220).hex(),
        chroma(117    , 107   ,  177).hex()],

        "4": [
        chroma(242    , 240   ,  247).hex(),
        chroma(203    , 201   ,  226).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(106    , 81    ,  163).hex()],

        "5": [
        chroma(242    , 240   ,  247).hex(),
        chroma(203    , 201   ,  226).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(117    , 107   ,  177).hex(),
        chroma(84     , 39    ,  143).hex()],

        "6": [
        chroma(242    , 240   ,  247).hex(),
        chroma(218    , 218   ,  235).hex(),
        chroma(188    , 189   ,  220).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(117    , 107   ,  177).hex(),
        chroma(84     , 39    ,  143).hex()],

        "7": [
        chroma(242    , 240   ,  247).hex(),
        chroma(218    , 218   ,  235).hex(),
        chroma(188    , 189   ,  220).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(128    , 125   ,  186).hex(),
        chroma(106    , 81    ,  163).hex(),
        chroma(74     , 20    ,  134).hex()],

        "8": [
        chroma(252    , 251   ,  253).hex(),
        chroma(239    , 237   ,  245).hex(),
        chroma(218    , 218   ,  235).hex(),
        chroma(188    , 189   ,  220).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(128    , 125   ,  186).hex(),
        chroma(106    , 81    ,  163).hex(),
        chroma(74     , 20    ,  134).hex()],

        "9": [
        chroma(252    , 251   ,  253).hex(),
        chroma(239    , 237   ,  245).hex(),
        chroma(218    , 218   ,  235).hex(),
        chroma(188    , 189   ,  220).hex(),
        chroma(158    , 154   ,  200).hex(),
        chroma(128    , 125   ,  186).hex(),
        chroma(106    , 81    ,  163).hex(),
        chroma(84     , 39    ,  143).hex(),
        chroma(63     , 0     ,  125).hex()],

    },

    "Reds": {
        "2": [
        chroma(254    , 224   ,  210).hex(),
        chroma(252    , 146   ,  114).hex()],

        "3": [
        chroma(254    , 224   ,  210).hex(),
        chroma(252    , 146   ,  114).hex(),
        chroma(222    , 45    ,  38).hex()],

        "4": [
        chroma(254    , 229   ,  217).hex(),
        chroma(252    , 174   ,  145).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(203    , 24    ,  29).hex()],

        "5": [
        chroma(254    , 229   ,  217).hex(),
        chroma(252    , 174   ,  145).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(222    , 45    ,  38).hex(),
        chroma(165    , 15    ,  21).hex()],

        "6": [
        chroma(254    , 229   ,  217).hex(),
        chroma(252    , 187   ,  161).hex(),
        chroma(252    , 146   ,  114).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(222    , 45    ,  38).hex(),
        chroma(165    , 15    ,  21).hex()],

        "7": [
        chroma(254    , 229   ,  217).hex(),
        chroma(252    , 187   ,  161).hex(),
        chroma(252    , 146   ,  114).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(239    , 59    ,  44).hex(),
        chroma(203    , 24    ,  29).hex(),
        chroma(153    , 0     ,  13).hex()],

        "8": [
        chroma(255    , 245   ,  240).hex(),
        chroma(254    , 224   ,  210).hex(),
        chroma(252    , 187   ,  161).hex(),
        chroma(252    , 146   ,  114).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(239    , 59    ,  44).hex(),
        chroma(203    , 24    ,  29).hex(),
        chroma(153    , 0     ,  13).hex()],

        "9": [
        chroma(255    , 245   ,  240).hex(),
        chroma(254    , 224   ,  210).hex(),
        chroma(252    , 187   ,  161).hex(),
        chroma(252    , 146   ,  114).hex(),
        chroma(251    , 106   ,  74).hex(),
        chroma(239    , 59    ,  44).hex(),
        chroma(203    , 24    ,  29).hex(),
        chroma(165    , 15    ,  21).hex(),
        chroma(103    , 0     ,  13).hex()],

    }
};


fs.writeFileSync("color-brew.json", JSON.stringify(colorBrew, null, "\t"));
fs.writeFileSync("color-brew.min.json", JSON.stringify(colorBrew));