% This program is a part of NASA Space Apps Challenge 2022 developed by
% Fellowship of the Ionospehre Team%
% --------------------------------------------------------------------
% program to run the ISS files fpmu datasets downloaded from SPDF NASA:
% https://spdf.gsfc.nasa.gov/pub/data/international_space_station_iss/sp_fpmu/
% keep the program in your data directory:
% to read the fpmu data which were in CDF format a special MATLAB patch
% file should be downloaded to your system from 
% https://cdf.gsfc.nasa.gov/html/matlab_cdf_patch.html
% and the CDF files can now be ready to use.
% ------------------------------------------------------------------------

clc
clear all
close all
% ----------------------------------------------------------
% path1=input('Enter path of ISS data');
a=dir;
path2=input('Enter path of NASA CDF patch');
% ----------------------------------------------------------
% A general ISS fpmu data file consists of the following attributes and
% variables:
% -----------------------------------------------------------
% [name]=spdfcdfinfo('iss_sp_fpmu_20150110_v01.cdf');
% Filename: 'iss_sp_fpmu_20150110_v01.cdf'
%            FileModDate: '02-Oct-2022 06:34:05'
%               FileSize: 2743010
%                 Format: 'CDF'
%          FormatVersion: '3.6.1'
%           FileSettings: [1×1 struct]
%               Subfiles: {}
%              Variables: {10×12 cell}
%       GlobalAttributes: [1×1 struct]
%     VariableAttributes: [1×1 struct]
%             LibVersion: '3.8.1'
%           PatchVersion: '3.8.1.0'
% ---------------------------------------------------------------
% The variables provided by the ISS fpmu CDF file:
% {'Epoch','Time';
% 'Latitude','Latitude';
% 'Longitude','Longitude';
% 'Altitude','Altitude';
% 'N_i','Total Ion Density (=Electron Density)'; 
% 'T_e','Electron Temperature';'Angle',
% 'ISS Pitch Angle';
% 'Sunlight','Percent Solar Illumination';
% 'TCC','Time Code Correction';
% 'GS','Processing Ground Station'}
% -----------------------------------------------------------------
addpath(path2)
% ------------------------------------------------------------------
for i = 5:length(a)
  a1{i-4}=spdfcdfread(a(i).name,'CombineRecords',0);  
end
% -------------------------------------------------------------------

for j =1:length(a1)
    idx=find(0< cell2mat(a1{j}(:,5)) & cell2mat(a1{j}(:,5))< 10e+19);
    % usually electron density ranges much below this value 
    % but to differentiate the supirous values from the data we made a condition 
    a2{j}=a1{j}(idx,1:9);
end
% --------------------------------------------------------------------
a3=a2;
for k=1:10
    for j=1:length(a2{k})
        a3{k}{j,1}=datevec(todatenum(a2{k}{j,1}));
%         convert the CDF epoch to datenum format
    end
end
% for k=1:10
%     a4{k}=([cell2mat(a3{k}(:,1)),cell2mat(a3{k}(:,2)),cell2mat(a3{k}(:,3)),cell2mat(a3{k}(:,4)),cell2mat(a3{k}(:,5)),cell2mat(a3{k}(:,6)),cell2mat(a3{k}(:,7)),cell2mat(a3{k}(:,8)),cell2mat(a3{k}(:,9))]);
% end
for k=1:10
    b{k} = cellfun(@double, a3{k}, 'uni', false);
%     make all the varaibles to uniform format
    b1{k}=cell2mat(b{k});
%     concatenate all the varaibles to a file
csvwrite(['ISS_files' num2str(k) '.csv'],b1{1});
% this saves daily files individually
end
