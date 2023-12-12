import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Typography, Box, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Videos from "./Videos";

const ClassHome = (props) => {
  const { id } = useParams();
  const width = '100%';
  const aspectRatio = 3 / 2;
  const height = `calc(${width} / ${aspectRatio})`;
  const title = props.classname;
  const channelId = "UWise";
  const channelTitle = "UWise Class";
  const viewCount = 1345;
  const likeCount = 2155;
  const videos = [
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "POe9SOEKotk"
        },
        "snippet": {
            "publishedAt": "2022-11-11T00:00:00Z",
            "channelId": "UCOmHUn--16B90oW2L6FRR3A",
            "title": "BLACKPINK - Shut Down M/V",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/POe9SOEKotk/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/POe9SOEKotk/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/POe9SOEKotk/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "BLACKPINK",
            "liveBroadcastContent": "none",
            "publishTime": "2022-11-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "B2QksrkvVSI"
        },
        "snippet": {
            "publishedAt": "1969-12-31T00:00:00Z",
            "channelId": "UCPvuJLd9RDVK630zY2b6Ykg",
            "title": "Air Force Fencing Western Invitational",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/B2QksrkvVSI/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/B2QksrkvVSI/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/B2QksrkvVSI/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Air Force Falcons",
            "liveBroadcastContent": "none",
            "publishTime": "1969-12-31T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "jOTfBlKSQYY"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "NewJeans (뉴진스) 'ETA' Official MV",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/jOTfBlKSQYY/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/jOTfBlKSQYY/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/jOTfBlKSQYY/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "6mzCbrTtTEw"
        },
        "snippet": {
            "publishedAt": "2022-11-11T00:00:00Z",
            "channelId": "UCDUI6xzccc1ZV41MgM1MixQ",
            "title": "Top 10 Most Viewed KPOP Music Videos Each Year - (2010 to 2022)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/6mzCbrTtTEw/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/6mzCbrTtTEw/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/6mzCbrTtTEw/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "AE Top Musics",
            "liveBroadcastContent": "none",
            "publishTime": "2022-11-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "sVTy_wmn5SU"
        },
        "snippet": {
            "publishedAt": "2023-01-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "NewJeans (뉴진스) 'OMG' Official MV (Performance ver.1)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/sVTy_wmn5SU/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/sVTy_wmn5SU/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/sVTy_wmn5SU/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2023-01-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "UPkMkIOzej8"
        },
        "snippet": {
            "publishedAt": "2023-10-28T00:00:00Z",
            "channelId": "UCAwv_Uc3b9JOB1-Sbf32R0w",
            "title": "Mood Booster 🌻Best Songs You Will Feel Happy and Positive After Listening To It (Immediate Effect)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/UPkMkIOzej8/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/UPkMkIOzej8/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/UPkMkIOzej8/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Feel Good",
            "liveBroadcastContent": "none",
            "publishTime": "2023-10-28T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "evu-N4P9_s4"
        },
        "snippet": {
            "publishedAt": "2023-09-11T00:00:00Z",
            "channelId": "UCjA5Jiu75LwtTktRBXqoi7A",
            "title": "NEWJEANS(뉴진스) - [playlist] 2023",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/evu-N4P9_s4/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/evu-N4P9_s4/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/evu-N4P9_s4/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Anna",
            "liveBroadcastContent": "none",
            "publishTime": "2023-09-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "Qc7_zRjH808"
        },
        "snippet": {
            "publishedAt": "2023-03-11T00:00:00Z",
            "channelId": "UCJEER74X9kBenMT_x9iK9Mw",
            "title": "FIFTY FIFTY (피프티피프티) - 'Cupid'  Official MV",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/Qc7_zRjH808/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/Qc7_zRjH808/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/Qc7_zRjH808/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "FIFTY FIFTY Official",
            "liveBroadcastContent": "none",
            "publishTime": "2023-03-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "kcelgrGY1h8"
        },
        "snippet": {
            "publishedAt": "2023-07-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "NewJeans (뉴진스) 'New Jeans' Official MV",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/kcelgrGY1h8/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/kcelgrGY1h8/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/kcelgrGY1h8/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2023-07-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "7HDeem-JaSY"
        },
        "snippet": {
            "publishedAt": "2023-06-11T00:00:00Z",
            "channelId": "UCritGVo7pLJLUS8wEu32vow",
            "title": "(여자)아이들((G)I-DLE) - '퀸카 (Queencard)' Official Music Video",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/7HDeem-JaSY/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/7HDeem-JaSY/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/7HDeem-JaSY/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "(G)I-DLE (여자)아이들 (Official YouTube Channel)",
            "liveBroadcastContent": "none",
            "publishTime": "2023-06-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "TOhUe_Mz7yg"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UCzKwUwMDlCzeAiwFKDP891w",
            "title": "[FULL ALBUM] NewJeans (뉴진스) - Get Up EP (2023)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/TOhUe_Mz7yg/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/TOhUe_Mz7yg/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/TOhUe_Mz7yg/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Kgasa",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "QU9c0053UAU"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "정국 (Jung Kook) 'Seven (feat. Latto)' Official MV",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/QU9c0053UAU/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/QU9c0053UAU/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/QU9c0053UAU/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "11cta61wi0g"
        },
        "snippet": {
            "publishedAt": "2022-11-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "NewJeans (뉴진스) 'Hype Boy' Official MV (Performance ver.1)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/11cta61wi0g/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/11cta61wi0g/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/11cta61wi0g/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2022-11-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "eZ5fovFH5v0"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UC222ggULI1uxDcbs0GQhqWw",
            "title": "[Full Album] NewJeans (뉴진스) - Get Up",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/eZ5fovFH5v0/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/eZ5fovFH5v0/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/eZ5fovFH5v0/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "해질녘",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "hLvWy2b857I"
        },
        "snippet": {
            "publishedAt": "2023-10-28T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "LE SSERAFIM (르세라핌) 'Perfect Night' OFFICIAL M/V with OVERWATCH 2",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/hLvWy2b857I/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/hLvWy2b857I/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/hLvWy2b857I/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2023-10-28T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "blYeGnBbSco"
        },
        "snippet": {
            "publishedAt": "2023-04-11T00:00:00Z",
            "channelId": "UCobtC-0-ZANkrrHXK7z43DA",
            "title": "New Jeans(새 청바지)| todas as música atualizada 2023 | Kim Belly",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/blYeGnBbSco/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/blYeGnBbSco/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/blYeGnBbSco/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "Naomy Tomboy ",
            "liveBroadcastContent": "none",
            "publishTime": "2023-04-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "_GgIt2EFHV8"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UCg8ZzloDPTrOiGztK0C9txQ",
            "title": "JEON SOMI (전소미) - Fast Forward M/V",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/_GgIt2EFHV8/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/_GgIt2EFHV8/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/_GgIt2EFHV8/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "THEBLACKLABEL",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "hB23sFrQGf0"
        },
        "snippet": {
            "publishedAt": "2023-07-11T00:00:00Z",
            "channelId": "UCJKOxCsYUBtoE_RM7Vwk3Og",
            "title": "NewJeans (뉴진스) - New Jeans (1 HOUR LOOP) Lyrics | 1시간 가사",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/hB23sFrQGf0/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/hB23sFrQGf0/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/hB23sFrQGf0/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "1 Høur",
            "liveBroadcastContent": "none",
            "publishTime": "2023-07-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "Xw-rOxA0ItI"
        },
        "snippet": {
            "publishedAt": "2023-08-11T00:00:00Z",
            "channelId": "UCMki_UkHb4qSc0qyEcOHHJw",
            "title": "NewJeans (뉴진스) Live @ Lollapalooza 2023 (Full Performance)",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/Xw-rOxA0ItI/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/Xw-rOxA0ItI/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/Xw-rOxA0ItI/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "NewJeans",
            "liveBroadcastContent": "none",
            "publishTime": "2023-08-11T00:00:00Z"
        }
    },
    {
        "kind": "youtube#searchResult",
        "id": {
            "kind": "youtube#video",
            "videoId": "pyf8cbqyfPs"
        },
        "snippet": {
            "publishedAt": "2022-11-11T00:00:00Z",
            "channelId": "UC3IZKseVpdzPSBaWxBxundA",
            "title": "LE SSERAFIM (르세라핌) 'ANTIFRAGILE' OFFICIAL M/V",
            "description": "",
            "thumbnails": {
                "default": {
                    "url": "https://i.ytimg.com/vi/pyf8cbqyfPs/default.jpg",
                    "width": 120,
                    "height": 90
                },
                "medium": {
                    "url": "https://i.ytimg.com/vi/pyf8cbqyfPs/mqdefault.jpg",
                    "width": 320,
                    "height": 180
                },
                "high": {
                    "url": "https://i.ytimg.com/vi/pyf8cbqyfPs/hqdefault.jpg",
                    "width": 480,
                    "height": 360
                }
            },
            "channelTitle": "HYBE LABELS",
            "liveBroadcastContent": "none",
            "publishTime": "2022-11-11T00:00:00Z"
        }
    }
]
  return (
    <Box minHeight="95vh">
      <Stack direction={{ xs: "column", md: "row" }}>
        <Box flex={1}>
          <Box sx={{ width: "100%", position: "sticky", top: "86px", paddingLeft: "14px" }}>
            <ReactPlayer
                url={`https://www.youtube.com/watch?v=${id}`}
                className="react-player"
                width="100%"
                height="560px"
                controls
                />
            <Typography color="black" variant="h5" fontWeight="bold" p={2}>
              {title}
            </Typography>
            <Stack direction="row" justifyContent="space-between" sx={{ color: "black" }} py={1} px={2} >
                <Typography variant={{ sm: "subtitle1", md: 'h6' }}  color="black" >
                  {channelTitle}
                  <CheckCircleIcon sx={{ fontSize: "12px", color: "gray", ml: "5px" }} />
                </Typography>
              <Stack direction="row" gap="20px" alignItems="center">
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(viewCount).toLocaleString()} views
                </Typography>
                <Typography variant="body1" sx={{ opacity: 0.7 }}>
                  {parseInt(likeCount).toLocaleString()} likes
                </Typography>
              </Stack>
            </Stack>
          </Box>
        </Box>
        <Box px={2} py={{ md: 1, xs: 5 }} justifyContent="center" alignItems="center" >
          <Videos videos={videos} direction="column" />
        </Box>
      </Stack>
   </Box>
  );
};

export default ClassHome;