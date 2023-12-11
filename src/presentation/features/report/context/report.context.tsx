"use client";
import useUser from "@/presentation/features/user/hooks/useUser.hook";
import { Socket, io } from "socket.io-client";
import React, { PropsWithChildren } from "react";
import APP_CONFIG from "@/modules/app/config/app.config";
import { SOCKET_EVENTS } from "@/presentation/features/report/report.types";
import { USER_ROLES } from "@/modules/user/user.type";
import useBins from "@/presentation/features/bin/hooks/useBins.hook";
import { toast } from "react-toastify";
import useAuth from "@/presentation/features/user/hooks/useAuth.hook";

const REPORTS = new Map<string, number>();

export interface ReportContextProps {
  connected: boolean;
  reports: Map<string, number>;
  getReportsForBin: (binId: string) => number;
  reportBin: (binId: string) => boolean;
  markBinAsEmpty: (binId: string) => boolean;
  markBinAsInDisposal: (binId: string) => boolean;
}

export const ReportContext = React.createContext<ReportContextProps>({
  connected: false,
  reports: new Map(),
  getReportsForBin: (binId: string) => 0,
  reportBin: (binId: string) => false,
  markBinAsEmpty: (binId: string) => false,
  markBinAsInDisposal: (binId: string) => false,
});

export interface ReportsContextProviderProps extends PropsWithChildren {}

export default function ReportContextprovider(
  props: ReportsContextProviderProps
) {
  const { children } = props;
  const { user } = useUser();
  const { auth, loading: authLoading } = useAuth();
  const { bins } = useBins();
  const [connected, setConnected] = React.useState(false);
  const [reports, setReports] = React.useState<Map<string, number>>(new Map());
  const [socket, setSocket] = React.useState<Socket | null>(null);

  function getReportsForBin(binId: string) {
    return reports.get(binId) || 0;
  }

  function reportBin(binId: string) {
    if (user && socket) {
      socket.emit(SOCKET_EVENTS.REPORT_BIN_FULL, user._id, binId);
      return true;
    }
    return false;
  }

  function markBinAsEmpty(binId: string) {
    if (user && user.role === USER_ROLES.DISPOSER && socket) {
      socket.emit(SOCKET_EVENTS.BIN_EMPTY, user._id, binId);
      return true;
    }
    return false;
  }

  function markBinAsInDisposal(binId: string) {
    if (user && user.role === USER_ROLES.DISPOSER && socket) {
      socket.emit(SOCKET_EVENTS.BIN_DISPOSAL, user._id, binId);
      return true;
    }
    return false;
  }

  // ===================== SOCKET METHODS ===========================

  /** connects to the chat websockets server */
  const connectSocket = React.useCallback(() => {
    if (user && auth && socket === null) {
      console.log("connecting");
      // Connect to the Socket.IO server
      const newSocket = io(APP_CONFIG.API_BASE_URL, {
        transports: ["polling"],
        reconnectionDelay: 2000,
      });

      newSocket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log("Connected to the server");
        setConnected(true);

        if (auth.role === USER_ROLES.DISPOSER) {
          // disposer sign in
          newSocket.emit(SOCKET_EVENTS.DISPOSER_LOGIN, user._id);
        }

        if (auth.role === USER_ROLES.USER) {
          // user sign in
          newSocket.emit(SOCKET_EVENTS.USER_LOGIN, user._id);
        }

        // server sends all reports for all bins
        newSocket.on(
          SOCKET_EVENTS.BIN_REPORTS,
          (data: { binId: string; totalReports: number }) => {
            reports.set(data.binId, data.totalReports);
          }
        );

        // server sends a recently emptied bin
        newSocket.on(SOCKET_EVENTS.BIN_EMPTY, (binId: string) => {
          const emptiedBin = bins.find((bin) => bin._id === binId);
          if (!emptiedBin) return;

          toast.info(`Bin at ${emptiedBin.location} has been disposed`);
        });

        // server sends a recently disposed bin
        newSocket.on(SOCKET_EVENTS.BIN_DISPOSAL, (binId: string) => {
          const disposalBin = bins.find((bin) => bin._id === binId);
          if (!disposalBin) return;

          toast.info(
            `Bin at ${disposalBin.location} is scheduled for disposal`
          );
        });

        newSocket.on(SOCKET_EVENTS.DISCONNECT, () => {
          console.log("Disconnected from the server");
          setSocket(null);
          setConnected(false);
        });
      });

      setSocket(newSocket);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, auth, socket, bins]);

  /** disconnects from the server */
  const disconnectSocket = React.useCallback(() => {
    if (socket) {
      socket.emit(SOCKET_EVENTS.LOGOUT, user ? user._id : "");
      socket.disconnect();
    }
    setSocket(null);
    setConnected(false);
  }, [socket, user]);

  // ===================== EFFECTS ===========================

  // handle disconnecting and connecting on auth change
  React.useEffect(() => {
    if (!authLoading) {
        connectSocket();
        
       if (!auth && socket && connected) {
        disconnectSocket();
      }
    }

    return () => {
      disconnectSocket();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, authLoading, socket]);

  return (
    <ReportContext.Provider
      value={{
        connected,
        reports,
        getReportsForBin,
        reportBin,
        markBinAsEmpty,
        markBinAsInDisposal,
      }}
    >
      {children}
    </ReportContext.Provider>
  );
}
