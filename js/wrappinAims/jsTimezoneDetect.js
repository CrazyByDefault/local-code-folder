/* jsTimezoneDetect - v1.0.5 - 2013-04-01 */

(function(B) {
    var A=function() {
        var I="s", E=2011, C=function(N) {
            var M=-N.getTimezoneOffset();
            return M!==null?M: 0;
        }
        , G=function(O, M, P) {
            var N=new Date;
            return O!==undefined&&N.setFullYear(O), N.setDate(P), N.setMonth(M), N;
        }
        , L=function(M) {
            return C(G(M, 0, 2));
        }
        , D=function(M) {
            return C(G(M, 5, 2));
        }
        , K=function(N) {
            var M=N.getMonth()>7?D(N.getFullYear()): L(N.getFullYear()), O=C(N);
            return M-O!==0;
        }
        , J=function() {
            var N=L(E), O=D(E), M=N-O;
            return M<0?N+",1": M>0?O+",1,"+I: N+",0";
        }
        , H=function() {
            var M=J();
            return new A.TimeZone(A.olson.timezones[M]);
        }
        , F=function(N) {
            var M=new Date(2010, 6, 15, 1, 0, 0, 0), O= {
                "America/Denver": new Date(2011, 2, 13, 3, 0, 0, 0), "America/Mazatlan": new Date(2011, 3, 3, 3, 0, 0, 0), "America/Chicago": new Date(2011, 2, 13, 3, 0, 0, 0), "America/Mexico_City": new Date(2011, 3, 3, 3, 0, 0, 0), "America/Asuncion": new Date(2012, 9, 7, 3, 0, 0, 0), "America/Santiago": new Date(2012, 9, 3, 3, 0, 0, 0), "America/Campo_Grande": new Date(2012, 9, 21, 5, 0, 0, 0), "America/Montevideo": new Date(2011, 9, 2, 3, 0, 0, 0), "America/Sao_Paulo": new Date(2011, 9, 16, 5, 0, 0, 0), "America/Los_Angeles": new Date(2011, 2, 13, 8, 0, 0, 0), "America/Santa_Isabel": new Date(2011, 3, 5, 8, 0, 0, 0), "America/Havana": new Date(2012, 2, 10, 2, 0, 0, 0), "America/New_York": new Date(2012, 2, 10, 7, 0, 0, 0), "Asia/Beirut": new Date(2011, 2, 27, 1, 0, 0, 0), "Europe/Helsinki": new Date(2011, 2, 27, 4, 0, 0, 0), "Europe/Istanbul": new Date(2011, 2, 28, 5, 0, 0, 0), "Asia/Damascus": new Date(2011, 3, 1, 2, 0, 0, 0), "Asia/Jerusalem": new Date(2011, 3, 1, 6, 0, 0, 0), "Asia/Gaza": new Date(2009, 2, 28, 0, 30, 0, 0), "Africa/Cairo": new Date(2009, 3, 25, 0, 30, 0, 0), "Pacific/Auckland": new Date(2011, 8, 26, 7, 0, 0, 0), "Pacific/Fiji": new Date(2010, 10, 29, 23, 0, 0, 0), "America/Halifax": new Date(2011, 2, 13, 6, 0, 0, 0), "America/Goose_Bay": new Date(2011, 2, 13, 2, 1, 0, 0), "America/Miquelon": new Date(2011, 2, 13, 5, 0, 0, 0), "America/Godthab": new Date(2011, 2, 27, 1, 0, 0, 0), "Europe/Moscow": M, "Asia/Yekaterinburg": M, "Asia/Omsk": M, "Asia/Krasnoyarsk": M, "Asia/Irkutsk": M, "Asia/Yakutsk": M, "Asia/Vladivostok": M, "Asia/Kamchatka": M, "Europe/Minsk": M, "Pacific/Apia": new Date(2010, 10, 1, 1, 0, 0, 0), "Australia/Perth": new Date(2008, 10, 1, 1, 0, 0, 0)
            }
            ;
            return O[N];
        }
        ;
        return {
            determine: H, date_is_dst: K, dst_start_for: F
        }
        ;
    }
    ();
    A.TimeZone=function(F) {
        var G= {
            "America/Denver": ["America/Denver", "America/Mazatlan"], "America/Chicago": ["America/Chicago", "America/Mexico_City"], "America/Santiago": ["America/Santiago", "America/Asuncion", "America/Campo_Grande"], "America/Montevideo": ["America/Montevideo", "America/Sao_Paulo"], "Asia/Beirut": ["Asia/Beirut", "Europe/Helsinki", "Europe/Istanbul", "Asia/Damascus", "Asia/Jerusalem", "Asia/Gaza"], "Pacific/Auckland": ["Pacific/Auckland", "Pacific/Fiji"], "America/Los_Angeles": ["America/Los_Angeles", "America/Santa_Isabel"], "America/New_York": ["America/Havana", "America/New_York"], "America/Halifax": ["America/Goose_Bay", "America/Halifax"], "America/Godthab": ["America/Miquelon", "America/Godthab"], "Asia/Dubai": ["Europe/Moscow"], "Asia/Dhaka": ["Asia/Yekaterinburg"], "Asia/Jakarta": ["Asia/Omsk"], "Asia/Shanghai": ["Asia/Krasnoyarsk", "Australia/Perth"], "Asia/Tokyo": ["Asia/Irkutsk"], "Australia/Brisbane": ["Asia/Yakutsk"], "Pacific/Noumea": ["Asia/Vladivostok"], "Pacific/Tarawa": ["Asia/Kamchatka"], "Pacific/Tongatapu": ["Pacific/Apia"], "Africa/Johannesburg": ["Asia/Gaza", "Africa/Cairo"], "Asia/Baghdad": ["Europe/Minsk"]
        }
        , E=F, C=function() {
            var J=G[E], H=J.length, I=0, K=J[0];
            for(;
            I<H;
            I+=1) {
                K=J[I];
                if(A.date_is_dst(A.dst_start_for(K))) {
                    E=K;
                    return;
                }
            }
        }
        , D=function() {
            return typeof G[E]!="undefined";
        }
        ;
        return D()&&C(), {
            name:function() {
                return E;
            }
        }
        ;
    }
    , A.olson= {}
    , A.olson.timezones= {
        "-720,0": "Pacific/Majuro", "-660,0": "Pacific/Pago_Pago", "-600,1": "America/Adak", "-600,0": "Pacific/Honolulu", "-570,0": "Pacific/Marquesas", "-540,0": "Pacific/Gambier", "-540,1": "America/Anchorage", "-480,1": "America/Los_Angeles", "-480,0": "Pacific/Pitcairn", "-420,0": "America/Phoenix", "-420,1": "America/Denver", "-360,0": "America/Guatemala", "-360,1": "America/Chicago", "-360,1,s": "Pacific/Easter", "-300,0": "America/Bogota", "-300,1": "America/New_York", "-270,0": "America/Caracas", "-240,1": "America/Halifax", "-240,0": "America/Santo_Domingo", "-240,1,s": "America/Santiago", "-210,1": "America/St_Johns", "-180,1": "America/Godthab", "-180,0": "America/Argentina/Buenos_Aires", "-180,1,s": "America/Montevideo", "-120,0": "America/Noronha", "-120,1": "America/Noronha", "-60,1": "Atlantic/Azores", "-60,0": "Atlantic/Cape_Verde", "0,0": "UTC", "0,1": "Europe/London", "60,1": "Europe/Berlin", "60,0": "Africa/Lagos", "60,1,s": "Africa/Windhoek", "120,1": "Asia/Beirut", "120,0": "Africa/Johannesburg", "180,0": "Asia/Baghdad", "180,1": "Europe/Moscow", "210,1": "Asia/Tehran", "240,0": "Asia/Dubai", "240,1": "Asia/Baku", "270,0": "Asia/Kabul", "300,1": "Asia/Yekaterinburg", "300,0": "Asia/Karachi", "330,0": "Asia/Kolkata", "345,0": "Asia/Kathmandu", "360,0": "Asia/Dhaka", "360,1": "Asia/Omsk", "390,0": "Asia/Rangoon", "420,1": "Asia/Krasnoyarsk", "420,0": "Asia/Jakarta", "480,0": "Asia/Shanghai", "480,1": "Asia/Irkutsk", "525,0": "Australia/Eucla", "525,1,s": "Australia/Eucla", "540,1": "Asia/Yakutsk", "540,0": "Asia/Tokyo", "570,0": "Australia/Darwin", "570,1,s": "Australia/Adelaide", "600,0": "Australia/Brisbane", "600,1": "Asia/Vladivostok", "600,1,s": "Australia/Sydney", "630,1,s": "Australia/Lord_Howe", "660,1": "Asia/Kamchatka", "660,0": "Pacific/Noumea", "690,0": "Pacific/Norfolk", "720,1,s": "Pacific/Auckland", "720,0": "Pacific/Tarawa", "765,1,s": "Pacific/Chatham", "780,0": "Pacific/Tongatapu", "780,1,s": "Pacific/Apia", "840,0": "Pacific/Kiritimati"
    }
    , typeof exports!="undefined"?exports.jstz=A:B.jstz=A;
}

)(this);