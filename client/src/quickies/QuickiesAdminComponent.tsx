// import React, { useEffect, useRef, useState } from 'react';
// import { IQuickie, IRecommenderConfig } from '~/features/quickies/types';
// import withQuickies, { WithQuickieProps } from '~/features/quickies/withQuickies';
// import { createUseStyles } from 'react-jss';
// import lodash from 'lodash';
// import jStat from 'jstat';
// import PopOver from '@mui/material/Popover';
// import Card from '@mui/material/Card'
// import Table from '@mui/material/Table'

// type QuickiesAdminProps = WithQuickieProps;

// interface QuickieAdminData extends IQuickie {
//   loadTimeMs: string;
// }

// const useStyles = createUseStyles(
//   (theme: Theme) => ({
//     post: {
//       position: 'relative',
//       display: 'flex',
//       flexDirection: 'column',
//       borderRadius: theme.spacing.base * 1.5,
//       '&:not(:first-child)': {
//         marginTop: theme.spacing.base * 3,
//       },
//       padding: theme.spacing.base * 2,
//       paddingTop: 30,
//       '@media (max-width: 299px)': {
//         borderRadius: 0,
//         '&:not(:first-child)': {
//           marginTop: theme.spacing.base * 2,
//         },
//       },
//     },

//     postHeader: {
//       zIndex: 100,
//       //position: 'absolute',
//       display: 'flex',
//       background: getRgbaFromHex(theme.colors.themeBase, 0.75),
//       left: theme.spacing.base * 2,
//       right: theme.spacing.base * 2,
//     },

//     titleBox: {
//       fontSize: 21,
//       padding: `${theme.spacing.base / 2}px 0 0 0`,
//       overflow: 'hidden',
//       textOverflow: 'ellipsis',
//     },

//     quickiesComponentBox: {},

//     statsPopOver: {
//       maxWidth: 1000,
//       display: 'flex',
//       alignItems: 'flex-end',
//       alignContent: 'flex-end',
//       flexDirection: 'unset',
//     },

//     controlComponentBox: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-evenly',
//     },

//     controlComponentRightBox: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-evenly',
//       padding: 24,
//       width: 240,
//     },

//     controlComponentLeftBox: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'space-between',
//       padding: 24,
//       width: 240,
//     },

//     sendMassEventsPopOver: {},

//     prefetchQuickiesBox: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       margin: 10,
//     },

//     prefetchQuickiesPopOver: {
//       display: 'flex',
//       flexDirection: 'column',
//       justifyContent: 'center',
//       margin: 2,
//     },

//     subButtonBox: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-evenly',
//     },

//     buttonBox: {
//       display: 'flex',
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },

//     eventButton: {
//       margin: 2,
//     },

//     content: {
//       flex: 1,
//       display: 'flex',
//       flexDirection: 'column',
//       paddingTop: theme.spacing.base * 6,
//     },
//     spacer: {
//       paddingTop: theme.spacing.base * 9.5,
//     },

//     listContainer: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexDirection: 'column-reverse',
//     },

//     listPopOver: {
//       maxWidth: 1500,
//       display: 'flex',
//       alignItems: 'flex-end',
//       alignContent: 'flex-end',
//       flexDirection: 'unset',
//     },

//     eventPopOver: {},

//     sendEventsBox: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//     },
//   }),
//   { name: 'QuickieAdmin' },
// );

// class QuickiesAdminStats {
//   loadTimes: Record<string, number[]> = {};
//   occurrences: Record<string, number> = {};
//   nullsSeen = 0;
// }

// function getEventFn(n: number): (q: QuickieAdminData) => void {
//   switch (n) {
//     case 1:
//       return (q) => q.onImpression();
//     case 2:
//       return (q) => q.onClick();
//     case 3:
//       return (q) => q.onViewed();
//     case 4:
//       return (q) => q.onCTA('test');
//     default:
//       return null;
//   }
// }

// const QuickiesAdmin: React.FC<QuickiesAdminProps> = (props) => {
//   const adminLog = (s: string) => console.log(`(${new Date().toISOString()}) [QuickiesAdminControl] ${s}`);
//   const nextQuickie = props.getNext;

//   const [statsViewIsOpen, setStatsViewIsOpen] = useState<boolean>(false);
//   const quickieAdminStats = useRef<QuickiesAdminStats>(new QuickiesAdminStats());

//   const addStats = (record: QuickieAdminData) => {
//     const stats = quickieAdminStats.current;
//     const key = record.source;
//     if (!stats.occurrences[key]) {
//       stats.occurrences[key] = 0;
//     }

//     if (!stats.loadTimes[key]) {
//       stats.loadTimes[key] = [];
//     }

//     stats.loadTimes[key].push(parseFloat(record.loadTimeMs));
//     stats.occurrences[key] += 1;
//   };

//   const calculateRowsForStatsTable = () => {
//     function buildLoadTimeRow(source: string, values: number[]) {
//       const data = jStat(values);
//       const [p10, p50, p90] = data.quantiles([0.1, 0.5, 0.9]);
//       return (
//         <tr>
//           <td>{source}</td>
//           <td>{data.mean().toFixed(2)}</td>
//           <td>{data.min().toFixed(2)}</td>
//           <td>{p10.toFixed(2)}</td>
//           <td>{p50.toFixed(2)}</td>
//           <td>{p90.toFixed(2)}</td>
//           <td>{data.max().toFixed(2)}</td>
//         </tr>
//       );
//     }

//     const totalCounts = Object.values(quickieAdminStats.current.occurrences).reduce((total, x) => x + total, 0);
//     function buildOccurrencesRow(source: string, count: number) {
//       return (
//         <tr>
//           <td>{source}</td>
//           <td>{count.toFixed(0)}</td>
//           <td>{(count / totalCounts).toFixed(2)}</td>
//         </tr>
//       );
//     }

//     return (
//       <div>
//         <div>
//           <h1>Load Times in ms</h1>
//           <Table headers={['source', 'mean', 'min', '10%', '50%', '90%', 'max']} striped>
//             {Object.keys(quickieAdminStats.current.loadTimes).length > 0 ? (
//               Object.entries(quickieAdminStats.current.loadTimes).map((entry) => buildLoadTimeRow(...entry))
//             ) : (
//               <tr></tr>
//             )}
//           </Table>
//         </div>
//         <div>
//           <h1>Occurrences by source</h1>
//           <Table headers={['source', 'count', 'rate']} striped>
//             {Object.keys(quickieAdminStats.current.occurrences).length > 0 ? (
//               Object.entries(quickieAdminStats.current.occurrences).map((entry) => buildOccurrencesRow(...entry))
//             ) : (
//               <tr></tr>
//             )}
//           </Table>
//         </div>
//       </div>
//     );
//   };

//   const [quickieIndex, setQuickieIndex] = useState<number>(0);
//   const [quickies, setQuickies] = useState<QuickieAdminData[]>([]);

//   const quickieEventCaptureWrapper = (quickie: QuickieAdminData) => ({
//     ...quickie,
//     onImpression: () => {
//       adminLog(`sendEvent - trigger impression event id=${quickie.id}`);
//       quickie.onImpression();
//     },
//     onViewed: () => {
//       adminLog(`sendEvent - trigger viewed event id=${quickie.id}`);
//       quickie.onViewed();
//     },
//     onClick: () => {
//       adminLog(`sendEvent - trigger clicked event id=${quickie.id}`);
//       quickie.onClick();
//     },
//     onCTA: (kind: string) => {
//       adminLog(`sendEvent - trigger cta event kind=${kind} id=${quickie.id}`);
//       quickie.onCTA(kind);
//     },
//   });

//   useEffect(function onInitialLoad() {
//     const log = (msg: string) => adminLog(`onInitialLoad - ${msg}`);
//     log('beginning initial load of records');
//     const start = performance.now();
//     Promise.all(lodash.range(0, 10).map((_) => nextQuickie())).then((records) => {
//       const loadTime = performance.now() - start;
//       const validRecords = [];
//       for (const record of records) {
//         if (record) {
//           const r = quickieEventCaptureWrapper({
//             ...record,
//             loadTimeMs: loadTime.toFixed(2),
//           });
//           addStats(r);
//           validRecords.push(r);
//           log(`found ${validRecords.length}/10 valid records`);
//         } else {
//           log('initial load found null record!');
//           quickieAdminStats.current.nullsSeen += 1;
//         }
//       }
//       log(`updating with ${validRecords.length} new quickies`);
//       setQuickies([...quickies, ...validRecords]);
//     });
//   }, []);

//   useEffect(
//     function onIndexUpdate() {
//       const log = (msg: string) => adminLog(`onIndexUpdate - ${msg}`);
//       if (quickieIndex !== 0 && quickies.length > 0) {
//         log('starting request for another quickie.');
//         const start = performance.now();
//         nextQuickie().then((newQuickie) => {
//           const loadTime = performance.now() - start;
//           if (newQuickie) {
//             const record = quickieEventCaptureWrapper({
//               ...newQuickie,
//               loadTimeMs: loadTime.toFixed(2),
//             });
//             addStats(record);
//             log('successfully loaded new quickie');
//             setQuickies([...quickies, record]);
//           } else {
//             log('found null quickie unexpectedly');
//             quickieAdminStats.current.nullsSeen += 1;
//           }
//         });
//       }
//     },
//     [quickieIndex],
//   );

//   const [listViewIsOpen, setListViewIsOpen] = useState<boolean>(false);
//   const [sendEventChoice, setSendEventChoice] = useState<number>(0);
//   const [sendEventsViewIsOpen, setSendEventsViewIsOpen] = useState<boolean>(false);

//   const [prefetchQuickiesIsOpen, setPrefetchQuickiesIsOpen] = useState<boolean>(false);
//   const [prefetchQuickiesAmount, setPrefetchQuickiesAmount] = useState<number>(0);

//   const [currentTab, setCurrentTab] = useState<number>(0);
//   const [sendViewOnSee, setSendViewOnSee] = useState<boolean>(false);

//   const prefetchQuickies = async () => {
//     const log = (msg: string) => adminLog(`prefetchQuickies - ${msg}`);
//     if (prefetchQuickiesAmount > 0) {
//       log(`beginning prefetch of ${prefetchQuickiesAmount} records`);
//       const start = performance.now();
//       const promises = lodash.range(0, prefetchQuickiesAmount).map(nextQuickie);
//       Promise.all(promises).then((records) => {
//         const loadTime = performance.now() - start;
//         const validRecords: QuickieAdminData[] = [];
//         for (const [idx, record] of records.entries()) {
//           if (!record) {
//             log(`unexpected null record during prefetch at idx=${idx}`);
//             quickieAdminStats.current.nullsSeen += 1;
//           } else {
//             const validRecord = quickieEventCaptureWrapper({
//               ...record,
//               loadTimeMs: loadTime.toFixed(2),
//             });
//             addStats(validRecord);
//             validRecords.push(validRecord);
//             log(`finished prefetching ${validRecords.length}/${prefetchQuickiesAmount} valid records`);
//           }
//         }
//         log(`updating with ${validRecords.length} prefetched new quickies`);
//         setQuickies([...quickies, ...validRecords]);
//       });
//     }
//   };

//   const [sendMassEventsIsOpen, setSendMassEventsIsOpen] = useState<boolean>(false);
//   const [sendMassEventsCount, setSendMassEventsCount] = useState<number>(0);
//   const [sendMassEventsChoice, setSendMassEventsChoice] = useState<number>(0);
//   const sendMassEvents = async () => {
//     const log = (msg: string) => adminLog(`sendMassEvents - ${msg}`);
//     const fn = getEventFn(sendMassEventsChoice);
//     const currentIndex = quickieIndex;
//     const endIndex = quickieIndex + sendMassEventsCount;
//     log(`sending mass events between ranges start=${currentIndex} end=${endIndex}`);
//     for (const i of lodash.range(currentIndex, endIndex)) {
//       if (i >= 0 && i <= quickies.length) {
//         const quickie = quickies[i];
//         fn(quickie);
//         log(`valid quickie index=${i}, sending event`);
//       } else {
//         log(`invalid quickie index=${i}, skipping event!`);
//       }
//     }
//     log('all events sent!');
//   };

//   const sendMassEventsCountIsValid = (): boolean => {
//     const count = sendMassEventsCount;
//     const minIndex = Math.min(count + quickieIndex, 0);
//     const maxIndex = count + quickieIndex;
//     return minIndex >= 0 && maxIndex <= quickies.length;
//   };

//   const classes = useStyles();

//   const controlComponent =
//     currentTab !== 1 ? (
//       <div></div>
//     ) : (
//       <div className={classes.controlComponentBox}>
//         <Paper className={classes.controlComponentLeftBox}>
//           <div style={{ margin: 10 }}>
//             <RaisedButton
//               id="quickies_stats"
//               label="stats"
//               fullWidth={true}
//               onClick={() => setStatsViewIsOpen(!statsViewIsOpen)}
//             />
//             <Popover
//               className={classes.statsPopOver}
//               targetId="quickies_stats"
//               disableOpenOnHover
//               open={statsViewIsOpen}>
//               <Paper>
//                 <div>
//                   <List>
//                     <ListItem primaryText="nulls seen" secondaryText={quickieAdminStats.current.nullsSeen} />
//                   </List>
//                 </div>
//                 <div>{statsViewIsOpen && calculateRowsForStatsTable()}</div>
//               </Paper>
//             </Popover>
//           </div>
//           <div style={{ margin: 10 }}>
//             <RaisedButton label="json" fullWidth={true} disabled={true} />
//           </div>
//         </Paper>
//         <Paper className={classes.controlComponentRightBox}>
//           <div style={{ margin: 10 }}>
//             <RaisedButton
//               id="prefetch_quickies"
//               label="prefetch quickies"
//               fullWidth={true}
//               onClick={() => setPrefetchQuickiesIsOpen(!prefetchQuickiesIsOpen)}
//             />
//             <Popover
//               className={classes.prefetchQuickiesPopOver}
//               targetId="prefetch_quickies"
//               disableOpenOnHover
//               open={prefetchQuickiesIsOpen}>
//               <div className={classes.prefetchQuickiesBox}>
//                 <div style={{ margin: 5, display: 'flex', justifyContent: 'center' }}>
//                   <TextInput
//                     placeholder="quickies to prefetch"
//                     required={true}
//                     isValid={prefetchQuickiesAmount > 0}
//                     onChange={(entry) => setPrefetchQuickiesAmount(parseInt(entry.target.value))}
//                     transparent
//                   />
//                 </div>
//                 <div style={{ margin: 5, display: 'flex', justifyContent: 'center' }}>
//                   <RaisedButton
//                     label="prefetch"
//                     disabled={prefetchQuickiesAmount <= 0}
//                     onClick={() => {
//                       setPrefetchQuickiesIsOpen(false);
//                       prefetchQuickies();
//                       setPrefetchQuickiesAmount(0);
//                     }}
//                   />
//                 </div>
//               </div>
//             </Popover>
//           </div>
//           <div style={{ margin: 10 }}>
//             <RaisedButton
//               id="send_mass_events"
//               label="send mass events"
//               fullWidth={true}
//               onClick={() => setSendMassEventsIsOpen(!sendMassEventsIsOpen)}
//             />
//             <Popover
//               className={classes.sendMassEventsPopOver}
//               targetId="send_mass_events"
//               disableOpenOnHover
//               open={sendMassEventsIsOpen}>
//               <div>
//                 <div>
//                   <RadioButtonGroup
//                     name="mass-send-text-radio-button-group"
//                     defaultChecked={false}
//                     defaultSelected={0}
//                     onChange={(ref) => {
//                       const value = parseInt(ref);
//                       if (Number.isFinite(value)) {
//                         setSendMassEventsChoice(value);
//                       }
//                     }}>
//                     <RadioButton label="impression" value={1} />
//                     <RadioButton label="click" value={2} />
//                     <RadioButton label="view" value={3} />
//                     <RadioButton label="cta" value={4} />
//                   </RadioButtonGroup>
//                 </div>
//                 <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
//                   <div>
//                     <TextInput
//                       placeholder="number of quickies"
//                       required={true}
//                       isValid={sendMassEventsCountIsValid()}
//                       errorText={
//                         !sendMassEventsCountIsValid() &&
//                         ((sendMassEventsCount < 0 && 'Not enough past events') || 'prefetch more to run this')
//                       }
//                       onChange={(ref) => {
//                         const value = parseInt(ref.target.value);
//                         if (Number.isFinite(value)) {
//                           setSendMassEventsCount(value);
//                         }
//                       }}
//                       transparent
//                     />
//                   </div>
//                   <div style={{ display: 'flex', justifyContent: 'center', margin: 10 }}>
//                     <RaisedButton
//                       id="mass-send-events-button"
//                       label="send"
//                       fullWidth={false}
//                       disabled={!getEventFn(sendMassEventsChoice) || !sendMassEventsCountIsValid()}
//                       onClick={() => {
//                         sendMassEvents();
//                         setSendMassEventsChoice(0);
//                         setSendMassEventsCount(0);
//                         setSendMassEventsIsOpen(false);
//                       }}
//                     />
//                   </div>
//                 </div>
//               </div>
//             </Popover>
//           </div>
//         </Paper>
//       </div>
//     );

//   let quickieComponent = (
//     <div>
//       <LoadingIndicator />
//     </div>
//   );

//   if (quickies.length > quickieIndex) {
//     const quickie = quickies[quickieIndex];
//     if (sendViewOnSee) {
//       quickie.onViewed();
//     }
//     quickieComponent = (
//       <div>
//         <div className="cardWrapper">
//           <div>
//             <Card title={`quickie: ${quickie.id}`} open={false}>
//               <List>
//                 <ListItem primaryText="quickieId" secondaryText={quickie.id} />
//                 <ListItem primaryText="creatorId" secondaryText={quickie.creatorId} />
//                 <ListItem primaryText="source" secondaryText={quickie.source} />
//                 <ListItem primaryText="listRank" secondaryText={quickie.listRank} />
//                 <ListItem primaryText="globalRank" secondaryText={quickie.globalRank} />
//                 <ListItem primaryText="loadTimeMs" secondaryText={quickie.loadTimeMs} />
//               </List>
//             </Card>
//           </div>
//         </div>
//         <div className={classes.buttonBox}>
//           <div className={classes.subButtonBox}>
//             <div>
//               <RaisedButton
//                 id="event_popover"
//                 label="send events"
//                 onClick={() => setSendEventsViewIsOpen(!sendEventsViewIsOpen)}
//               />
//               <Popover
//                 className={classes.eventPopOver}
//                 targetId="event_popover"
//                 disableOpenOnHover
//                 open={sendEventsViewIsOpen}>
//                 <div style={{ maxWidth: 120, alignItems: 'stretch' }}>
//                   <div>
//                     <RadioButtonGroup
//                       name="send-event-radio-button-group"
//                       defaultChecked={false}
//                       defaultSelected={0}
//                       onChange={(ref) => {
//                         const value = parseInt(ref);
//                         if (Number.isFinite(value)) {
//                           setSendEventChoice(value);
//                         }
//                       }}>
//                       <RadioButton label="impression" value={1} />
//                       <RadioButton label="click" value={2} />
//                       <RadioButton label="view" value={3} />
//                       <RadioButton label="cta" value={4} />
//                     </RadioButtonGroup>
//                   </div>
//                   <RaisedButton
//                     id="send-events-button"
//                     label="send"
//                     disabled={!getEventFn(sendEventChoice)}
//                     onClick={() => {
//                       const fn = getEventFn(sendEventChoice);
//                       fn(quickie);
//                       setSendEventsViewIsOpen(false);
//                       setSendEventChoice(-1);
//                     }}
//                   />
//                 </div>
//               </Popover>
//             </div>
//           </div>
//           <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//             <Toggle label="viewed on next" toggled={sendViewOnSee} onToggle={() => setSendViewOnSee(!sendViewOnSee)} />
//             <IconButton
//               name="arrowBack"
//               onClick={() => setQuickieIndex(quickieIndex - 1)}
//               disabled={quickieIndex <= 0}
//               shadow={quickieIndex <= 0 ? 'off' : 'on'}
//               selected={false}
//             />
//             <IconButton
//               name="arrowForward"
//               onClick={() => setQuickieIndex(quickieIndex + 1)}
//               disabled={quickieIndex >= quickies.length}
//               selected={false}
//             />
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const listViewComponent = (
//     <div>
//       <div>
//         <IconButton id="list_popover" name="visibility" onClick={() => setListViewIsOpen(!listViewIsOpen)} />
//         <Popover className={classes.listPopOver} targetId="list_popover" disableOpenOnHover open={listViewIsOpen}>
//           <div className={classes.listContainer}>
//             <Table
//               headers={[
//                 { title: 'index', minWidth: quickies.length.toString().length + 1 },
//                 { title: 'id', minWidth: Math.max(...quickies.map((x) => x.id.length)) + 1 },
//                 { title: 'creator', minWidth: Math.max(...quickies.map((x) => x.creatorId.toString().length)) + 1 },
//                 { title: 'viewed', minWidth: 'false'.length },
//                 { title: 'loadTimeMs', minWidth: 25 },
//                 { title: 'source', minWidth: Math.max(...quickies.map((x) => x.source.length)) + 1 },
//                 { title: 'listRank', minWidth: Math.max(...quickies.map((x) => x.listRank.toString().length)) + 1 },
//                 { title: 'globalRank', minWidth: Math.max(...quickies.map((x) => x.globalRank.toString().length)) + 1 },
//               ]}>
//               {quickies.map((x, i) => (
//                 <tr key={i}>
//                   <td>{i}</td>
//                   <td>{x.id}</td>
//                   <td>{x.creatorId}</td>
//                   <td>{x.isViewed() ? 'true' : 'false'}</td>
//                   <td>{x.loadTimeMs}</td>
//                   <td>{x.source}</td>
//                   <td>{x.listRank}</td>
//                   <td>{x.globalRank}</td>
//                 </tr>
//               ))}
//             </Table>
//           </div>
//         </Popover>
//       </div>
//     </div>
//   );

//   return (
//     <div>
//       <Paper className={classes.post}>
//         <div className={classes.postHeader}>
//           <CircleImage
//             src="https://cdn.pixabay.com/photo/2016/03/11/15/22/crocodile-1250472_960_720.jpg"
//             alt="Quickies Admin Control"
//             border={true}
//             shadow={true}
//             size={64}
//           />
//           <div className={classes.titleBox}>Quickies Admin Control</div>
//         </div>
//         <div>
//           <Tabs
//             value={currentTab}
//             onChange={(value) => {
//               setListViewIsOpen(false);
//               setSendEventsViewIsOpen(false);
//               setSendMassEventsIsOpen(false);
//               setPrefetchQuickiesIsOpen(false);
//               setCurrentTab(value);
//               setStatsViewIsOpen(false);
//             }}>
//             <Tab label={<SvgIcon name="info" />} selected={currentTab === 0} />
//             <Tab label={<SvgIcon name="settings" />} selected={currentTab === 1} />
//           </Tabs>
//         </div>
//         <div className={classes.post}>
//           {currentTab === 0 && quickieComponent}
//           {currentTab === 1 && controlComponent}
//         </div>
//         <div>{listViewComponent}</div>
//       </Paper>
//       <div className={classes.spacer}></div>
//     </div>
//   );
// };

// export default withQuickies(QuickiesAdmin, {
//   localStorageKey: 'abc-123',
//   recommenderConfigs: lodash.range(0, 10).map((i) => ({
//     source: `rec_${i}`,
//     params: [1, 1],
//   })),
// });
export {};
